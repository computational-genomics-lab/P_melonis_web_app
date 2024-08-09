import { spawn } from 'child_process';
import { join } from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { sequence1, sequence2 } = req.query;

    // Create temporary FASTA files to store the sequences
    const fastaFilePath1 = join('/home/sutripa/next_app_backup/pages/nav_pages', 'temp_sequence1.fasta');
    const fastaFilePath2 = join('/home/sutripa/next_app_backup/pages/nav_pages', 'temp_sequence2.fasta');

    const fastaFileContent1 = `>UserSequence1\n${sequence1}\n`;
    const fastaFileContent2 = `>UserSequence2\n${sequence2}\n`;

    try {
      fs.writeFileSync(fastaFilePath1, fastaFileContent1);
      fs.writeFileSync(fastaFilePath2, fastaFileContent2);

      // Run the BLAST algorithm using bl2seq
      const blastProcess = spawn('bl2seq', [
        '-p', 'blastn',
        '-i', fastaFilePath1,
        '-j', fastaFilePath2,
        '-o', 'blast_results.txt'
      ]);

      blastProcess.on('error', (error) => {
        console.error('Error running BLAST:', error);
        res.status(500).json({ error: 'An error occurred while running BLAST' });
      });

      blastProcess.on('close', async (code) => {
        console.log('BLAST process finished with code:', code);

        if (code === 0) {
          // Read and process the results from 'blast_results.txt'
          const blastResults = fs.readFileSync('blast_results.txt', 'utf-8');
          console.log('BLAST results:', blastResults); // Log the results

          // Respond with the results to the frontend
          res.status(200).json({ results: blastResults });
        } else {
          res.status(500).json({ error: 'BLAST process failed' });
        }

        // Clean up: delete the temporary FASTA files
        try {
          fs.unlinkSync(fastaFilePath1);
          fs.unlinkSync(fastaFilePath2);
        } catch (unlinkError) {
          console.error('Error deleting temporary files:', unlinkError);
        }
      });
    } catch (writeError) {
      console.error('Error writing FASTA files:', writeError);
      res.status(500).json({ error: 'An error occurred while writing the FASTA files' });
    }
  } else {
    res.status(405).end();
  }
}
