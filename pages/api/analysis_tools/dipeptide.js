import { spawn } from 'child_process';
import { join } from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { sequence } = req.query;

    // Create a temporary FASTA file to store the sequence
    const fastaFilePath = join('temp.fasta');
    const fastaFileContent = `>UserSequence\n${sequence}\n`;

    try {
      fs.writeFileSync(fastaFilePath, fastaFileContent);

      // Run the dipeptide freq script

      const blastProcess = spawn('perl', ['pages/api/analysis_tools/scripts/dipeptidefreq.pl', fastaFilePath, 'dipeptide_freq.txt']);


      blastProcess.on('error', (error) => {
        console.error('Error running Dipeptide frequency perl script:', error);
        res.status(500).json({ error: 'An error occurred while running Dipeptide frequency perl script' });
      });

      blastProcess.on('close', async (code) => {
        console.log('Dipeptide frequency perl script process finished with code:', code);

        if (code === 0) {
          // Read and process the results from 'dipeptide_freq.txt'
          const blastResults = fs.readFileSync('dipeptide_freq.txt', 'utf-8');
          console.log('Dipeptide frequency perl script results:', blastResults); // Log the results

          // Respond with the results to the frontend
          res.status(200).json({ results: blastResults });
        } else {
          res.status(500).json({ error: 'Dipeptide frequency perl script process failed' });
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
