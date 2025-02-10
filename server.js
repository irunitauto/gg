const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Supabase URL and Key must be provided as environment variables.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

app.get('/recipes', async (req, res) => {
  const { data, error } = await supabase.from('recipes').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post('/add-recipe', async (req, res) => {
  const { title, ingredients, instructions, image } = req.body;
  const { data, error } = await supabase.from('recipes').insert([{ title, ingredients, instructions, image }]);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.listen(5000, () => console.log('Server running on port 5000'));
