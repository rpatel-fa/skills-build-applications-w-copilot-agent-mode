import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/database';
import apiRouter from './routes/api';

dotenv.config();

const app = express();
const PORT = 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is running', baseUrl });
});

db.once('open', () => {
  console.log('MongoDB connection established');
});

app.listen(PORT, () => {
  console.log(`Backend server running at ${baseUrl}`);
});

export default app;
