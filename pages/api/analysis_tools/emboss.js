
import { spawn } from 'child_process';

// Upper bound on submitted sequence size. Chosen to be far above any plausible
// single-sequence submission while preventing an unbounded request body from
// being buffered and handed to a subprocess.
const MAX_SEQUENCE_BYTES = 100_000;

// Wall-clock limit for the child process.
const TRANSEQ_TIMEOUT_MS = 30_000;

// IUPAC nucleotide and amino-acid codes, plus the gap, stop and whitespace
// characters that legitimately appear in submitted sequence data. Deliberately
// an allowlist: anything not named here is rejected rather than escaped.
const ALLOWED_SEQUENCE = /^[A-Za-z*\-.\s]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sequence } = req.body ?? {};

  if (!sequence || typeof sequence !== 'string') {
    return res.status(400).json({ error: 'Sequence data is required' });
  }

  if (Buffer.byteLength(sequence, 'utf8') > MAX_SEQUENCE_BYTES) {
    return res.status(413).json({ error: 'Sequence too large' });
  }

  if (!ALLOWED_SEQUENCE.test(sequence)) {
    return res
      .status(400)
      .json({ error: 'Sequence contains unsupported characters' });
  }

  // spawn with an argument array and shell:false. No shell is involved, so the
  // sequence is never parsed as a command regardless of its contents. The
  // 'stdin'/'stdout' arguments are EMBOSS's own pseudo-filenames and match the
  // previous invocation, so transeq's behaviour and output are unchanged.
  const child = spawn('transeq', ['stdin', 'stdout'], { shell: false });

  let stdout = '';
  let stderr = '';
  let settled = false;

  const timer = setTimeout(() => {
    child.kill('SIGKILL');
  }, TRANSEQ_TIMEOUT_MS);

  const finish = (status, payload) => {
    if (settled) return;
    settled = true;
    clearTimeout(timer);
    res.status(status).json(payload);
  };

  child.stdout.on('data', (chunk) => {
    stdout += chunk;
  });

  child.stderr.on('data', (chunk) => {
    stderr += chunk;
  });

  child.on('error', (error) => {
    console.error(`transeq spawn failed: ${error.message}`);
    finish(500, { error: 'Failed to run EMBOSS command' });
  });

  child.on('close', (code, signal) => {
    if (signal === 'SIGKILL') {
      return finish(504, { error: 'EMBOSS command timed out' });
    }
    if (code !== 0) {
      console.error(`transeq exited ${code}: ${stderr}`);
      return finish(500, { error: 'Failed to run EMBOSS command' });
    }
    // NOTE: the previous implementation treated ANY output on stderr as a
    // failure. EMBOSS tools routinely write progress and informational text to
    // stderr, so that check could fail on successful runs. Exit status is used
    // here instead. This IS an observable behaviour change and needs sign-off
    // before merge -- see the accompanying note in docs/security-findings.md.
    finish(200, { result: stdout });
  });

  child.stdin.on('error', (error) => {
    console.error(`transeq stdin write failed: ${error.message}`);
    finish(500, { error: 'Failed to run EMBOSS command' });
  });

  // The previous implementation piped `echo "$sequence"`, which appends a
  // trailing newline. Reproduced here so transeq receives identical input.
  child.stdin.end(`${sequence}\n`);
}
