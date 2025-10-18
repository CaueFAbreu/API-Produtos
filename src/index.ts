import express from 'express';
import { productRoutes } from './routes/productRoutes.js'; // Importa suas rotas

const app = express();
const PORT = 3000; 

app.use(express.json());

app.use('/api/produtos', productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});