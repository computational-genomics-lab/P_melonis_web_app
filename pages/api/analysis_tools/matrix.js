import { spawn } from 'child_process';
import fs from 'fs';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { sequence, type } = req.query;

    // Create a temporary FASTA file to store the sequence
    const fastaFilePath = 'temp.fasta';
    const fastaFileContent = `>UserSequence\n${sequence}\n`;

    try {
      fs.writeFileSync(fastaFilePath, fastaFileContent);

      // Run the BLAST algorithm using blastall
      const blastProcess = spawn('perl', ['pages/api/analysis_tools/scripts/pssm2.pl', fastaFilePath, type, 'matrix_results.txt']);

      blastProcess.on('error', (error) => {
        console.error('Error running BLAST:', error);
        res.status(500).json({ error: 'An error occurred while running BLAST' });
      });

      blastProcess.on('close', async (code) => {
        console.log('BLAST process finished with code:', code);

        if (code === 0) {
          // Read and process the results from 'blast_results.txt'
          const blastResults = fs.readFileSync('matrix_results.txt', 'utf-8');
          console.log('BLAST results:', blastResults); // Log the results

          // Respond with the results to the frontend
          res.status(200).json({ results: blastResults });
        } else {
          res.status(500).json({ error: 'BLAST process failed' });
        }

        //Clean up: delete the temporary FASTA file
        try {
          fs.unlinkSync(fastaFilePath);
        } catch (unlinkError) {
          console.error('Error deleting temporary file:', unlinkError);
        }
      });
    } catch (writeError) {
      console.error('Error writing FASTA file:', writeError);
      res.status(500).json({ error: 'An error occurred while writing the FASTA file' });
    }
  } else {
    res.status(405).end();
  }
}
