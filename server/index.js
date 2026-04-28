import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// --- Rutas (se añadirán en fases posteriores) ---
// import authRouter from './routes/auth.js';
// import chatRouter from './routes/chat.js';
// app.use('/api/auth', authRouter);
// app.use('/api/chat', chatRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '🌙 InsomnIA API online' });
});

app.listen(PORT, () => {
  console.log(`🌙 InsomnIA Server corriendo en http://localhost:${PORT}`);
});
