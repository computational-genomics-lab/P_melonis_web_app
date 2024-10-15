import fs from 'fs';
import path from 'path';
import archiver from 'archiver';
import { promisify } from 'util';
import { pipeline } from 'stream';
import fsExtra from 'fs-extra';

const pipelineAsync = promisify(pipeline);

export default async function handler(req, res) {
  const { basename } = req.query;

  if (!basename) {
    return res.status(400).json({ error: 'basename query parameter is required' });
  }

  const publicDir = path.join(process.cwd(), 'public', 'melonis_genomes');
  const zipFilename = `${basename}.zip`;
  const zipFilePath = path.join(publicDir, zipFilename);

  try {
    // Find all files that contain the basename in their filename in the melonis_genomes directory
    const files = fs.readdirSync(publicDir).filter(file => file.includes(basename));

    if (files.length === 0) {
      return res.status(404).json({ error: 'No files found with the specified basename' });
    }

    // Create a zip file with Archiver
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.pipe(output);

    files.forEach(file => {
      const filePath = path.join(publicDir, file);
      archive.file(filePath, { name: file });
    });

    await archive.finalize();

    // Send the zip file to the client
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=${zipFilename}`);

    // Stream the zip file to the response
    await pipelineAsync(fs.createReadStream(zipFilePath), res);

    // Delete the zip file after sending it to the client
    await fsExtra.remove(zipFilePath);
  } catch (error) {
    console.error('Error creating zip file:', error);
    res.status(500).json({ error: 'Error creating zip file' });
  }
}

