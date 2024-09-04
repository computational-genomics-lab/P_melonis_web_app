import fs from 'fs';
import path from 'path';
import archiver from 'archiver';

export default function handler(req, res) {
  const { basename } = req.query;
  const zipFileName = `${basename}.zip`;
  const zipFilePath = path.join(process.cwd(), 'public', 'melonis_genomes', zipFileName);

  // Create a file to stream the archive data to
  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver('zip', {
    zlib: { level: 9 } // Set the compression level
  });

  output.on('close', () => {
    console.log(`${archive.pointer()} total bytes`);
    console.log('archiver has been finalized and the output file descriptor has closed.');

    // Send the zip file to the client
    res.download(zipFilePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error sending file');
      } else {
        // Delete the zip file from the server after it has been sent to the client
        fs.unlink(zipFilePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error('Error deleting file:', unlinkErr);
          } else {
            console.log('Zip file deleted from server');
          }
        });
      }
    });
  });

  output.on('end', () => {
    console.log('Data has been drained');
  });

  archive.on('error', (err) => {
    throw err;
  });

  // Pipe the archive data to the file
  archive.pipe(output);

  // Append files to the zip archive
  archive.glob(`${basename}*`, {
    cwd: path.join(process.cwd(), 'public', 'melonis_genomes')
  });

  // Finalize the archive (this is when the 'close' event will be fired)
  archive.finalize();
}
