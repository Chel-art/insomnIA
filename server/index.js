import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/auth', authRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: '🌙 InsomnIA API online' });
});

app.listen(PORT, () => {
  console.log(`🌙 InsomnIA Server corriendo en http://localhost:${PORT}`);
});
