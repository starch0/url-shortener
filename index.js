import express from 'express';
import { nanoid } from 'nanoid';
import db from './db.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/shorten', (req, res) => {
    const { url } = req.body;
  
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
  
    const id = nanoid(6);
  
    db.run('INSERT INTO links (id, original_url) VALUES (?, ?)', [id, url], (err) => {

      res.json({ shortUrl: `http://localhost:${PORT}/${id}` }); 
    });
  });
  

app.get('/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT original_url FROM links WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'failed to fetch' });
    }
    if (!row) {
      return res.status(404).send('link not found');
    }
    res.redirect(row.original_url);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});