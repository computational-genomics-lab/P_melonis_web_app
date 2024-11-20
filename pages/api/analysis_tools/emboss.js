import { exec } from 'child_process';

export default async function handler(req, res) {
    const { sequence } = req.body;
    
    if (!sequence) {
        return res.status(400).json({ error: 'Sequence data is required' });
    }

    // Run an EMBOSS command like transeq
    exec(`echo "${sequence}" | transeq stdin stdout`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: 'Failed to run EMBOSS command' });
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).json({ error: 'Error in EMBOSS output' });
        }

        res.status(200).json({ result: stdout });
    });
}