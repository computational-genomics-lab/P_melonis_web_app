// import { spawn } from 'child_process';
// import { join } from 'path';
// import fs from 'fs';

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     const { sequence, organisms } = req.query;

//     // Split the comma-separated list of organisms into an array
//     const organismList = organisms.split(',');

//     const blastResults = {}; //make a dictionary to hold the blast results for each organism

//     // Create a temporary FASTA file to store the sequence
//     const fastaFilePath = join('/home/sutripa/next_app_backup/pages/nav_pages', 'temp.fasta');
//     const fastaFileContent = `>UserSequence\n${sequence}\n`;

//     try {
//       fs.writeFileSync(fastaFilePath, fastaFileContent);

//       // Loop through each organism and perform BLAST
//       for (const organism of organismList) {
//         const organismBlastResultFile = `blast_results_${organism}.txt`;

//         const blastProcess = spawn('blastall', ['-p', 'blastn', '-i', fastaFilePath, '-d', `/home/sutripa/BLAST_DATA/BLASTN_DATA/${organism}`, '-o', organismBlastResultFile]);

//         await new Promise((resolve, reject) => {
//           // Add an event listener for the `error` event.
//           blastProcess.on('error', (error) => {
//             console.error('Error running BLAST:', error);
//             reject(error);
//           });
//           //Add an event listener for the `close` event.
//           blastProcess.on('close', (code) => {
//             console.log(`BLAST process for ${organism} finished with code:`, code);
//             if (code === 0) {
//               const blastResult = fs.readFileSync(organismBlastResultFile, 'utf-8');
//               //we want the filereading function to be synchronous
//               blastResults[organism] = blastResult;
              
//             } else {
//               blastResults[organism] = `BLAST process failed for ${organism}`;
//             }
//           // after saving the results, the created file is unlinked 
//             fs.unlinkSync(`blast_results_${organism}.txt`);
//             resolve();
//           });
//         });
//       }

//       // Respond with the aggregated results to the frontend
//       const responseArray = organismList.map((organism) => ({
//         organism,
//         blastResult: blastResults[organism]
//       }));
      
//       res.status(200).json({ results: responseArray });
//       // Clean up: delete the temporary FASTA file 
      
//       fs.unlinkSync(fastaFilePath);


//     } catch (writeError) {
//       console.error('Error writing FASTA file:', writeError);
//       res.status(500).json({ error: 'An error occurred while writing the FASTA file' });
//     }
//   } else {
//     res.status(405).end();
//   }
// }

// here all the blast results are being stored in a dictionary and then the dictionary 
// is being rendered in the frontend. in the frontend the JSON is stringified. 

// i think a better idea would be to append all the blast data into a single file
// and then send the results to the frontend. 


import { spawn } from 'child_process';
import { join } from 'path';
import fs from 'fs';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { sequence, organisms } = req.query;

    // Split the comma-separated list of organisms into an array
    const organismList = organisms.split(',');

    try {
      for (const organism of organismList) {
        // Create a temporary FASTA file to store the sequence
        const fastaFilePath = join('temp.fasta');
        const fastaFileContent = `>${organism}\n${sequence}\n`;
        fs.writeFileSync(fastaFilePath, fastaFileContent);

        // Run the BLAST algorithm using blastall and append results to the blast_results.txt
        const blastProcess = spawn('blastall', [
          '-p', 'blastn',
          '-i', fastaFilePath,
          '-d', `/home/ajaya/BLAST_DATA/BLASTN_DATA/${organism}`,
          
          '>>', 'blast_results.txt'
        ], { shell: true });

        blastProcess.on('error', (error) => {
          console.error('Error running BLAST:', error);
          res.status(500).json({ error: 'An error occurred while running BLAST', error });
        });

        await new Promise((resolve) => {
          blastProcess.on('close', (code) => {
            console.log(`BLAST process for ${organism} finished with code:`, code);
            resolve();
          });
        });

        // Clean up: delete the temporary FASTA file
	      fs.unlinkSync(fastaFilePath);
      }

      // Read and process the results from 'blast_results.txt'
      const blastResults = fs.readFileSync('blast_results.txt', 'utf-8');
      console.log('BLAST results:', blastResults); // Log the results

      // Copy the blast_results.txt file to the public directory (done for downloading blast output file and uploading it)
      // const copyFilePath = join(process.cwd(), 'public', 'blast_results.txt');
      // fs.copyFileSync('blast_results.txt', copyFilePath);

      // Respond with the results to the frontend
      res.status(200).json({ results: blastResults });

      // Clean up: delete the blast_results.txt file
      fs.unlinkSync('blast_results.txt');
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while processing the BLAST' });
    }
  } else {
    res.status(405).end();
  }
}
