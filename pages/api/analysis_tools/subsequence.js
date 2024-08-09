import { spawn } from 'child_process';
import fs from 'fs';

// Define a function to compute the reverse complement of a DNA sequence
const reverseComplement = (sequence) => {
  const complementMap = { A: 'T', T: 'A', G: 'C', C: 'G' };
  return sequence.split('').reverse().map((base) => complementMap[base] || base).join('');
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { contig, organism, start, end, strand } = req.query;

    // Run the Subsequence algorithm using fastacmd
    const blastProcess = spawn('fastacmd', [
      '-d', `/home/sutripa/BLAST_DATA/BLASTN_DATA/${organism}`,
      '-s', contig,
      '-L', `${start},${end}`,
      '-S', '1',
      '-o', 'subseq_results.txt'
    ]);

    blastProcess.on('error', (error) => {
      console.error('Error running Subsequence:', error);
      res.status(500).json({ error: 'An error occurred while running Subsequence' });
    });

    blastProcess.on('close', async (code) => {
      console.log('Subsequence process finished with code:', code);

      if (code === 0) {
        // Read and process the results from 'subseq_results.txt'
        const subseqResults = fs.readFileSync('subseq_results.txt', 'utf-8');
        const lines = subseqResults.split('\n'); // Split by newline to separate header and sequence
        const header = lines[0]; // Header line
        let sequence = lines.slice(1).join(''); // Join the rest as the sequence

        console.log('Header:', header);
        console.log('Original Sequence:', sequence); // Log the original sequence

        // Check if the strand is set to reverse (2)
        if (strand === '2') {
          // Calculate the reverse complement using the provided function
          const reversedSequence = reverseComplement(sequence);
          sequence = reversedSequence;

          console.log('Reversed and Complemented Sequence:', sequence); // Log the modified sequence
        }

        // Respond with the header and sequence
        // res.status(200).json({ header, results: sequence });
        res.status(200).json({ results: header + '\n' +  sequence });

      } else {
        res.status(500).json({ error: 'Subsequence process failed' });
      }
    });
  } else {
    res.status(405).end();
  }
}
