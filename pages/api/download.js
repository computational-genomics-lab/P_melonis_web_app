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

  const publicDir = path.join(process.cwd(), 'public', 'genomes');
  const zipFilename = `${basename}.zip`;
  const zipFilePath = path.join(publicDir, zipFilename);

  try {
    const files = fs.readdirSync(publicDir).filter(file => file.includes(basename));

    if (files.length === 0) {
      return res.status(404).json({ error: 'No files found with the specified basename' });
    }

    // Create a zip file
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.pipe(output);

    files.forEach(file => {
      const filePath = path.join(publicDir, file);
      archive.file(filePath, { name: file });
    });

    await archive.finalize();

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=${zipFilename}`);

    await pipelineAsync(fs.createReadStream(zipFilePath), res);

  } catch (error) {
    console.error('Error creating zip file:', error);
    res.status(500).json({ error: 'Error creating zip file' });
  } finally {
    if (fsExtra.pathExists(zipFilePath)) {
      await fsExtra.remove(zipFilePath); // Clean up zip file
    }
  }
}