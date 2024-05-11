import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { router as emailRoutes } from './routes/email.route';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/email', emailRoutes);

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`server running on port ${port}`);
});
