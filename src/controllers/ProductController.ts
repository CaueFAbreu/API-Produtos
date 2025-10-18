import type { Request, Response } from 'express'; // <-- FIX 1: Adicionado 'type'
import { ProductService } from '../services/ProductService.js';

export class ProductController {
  private productService = new ProductService();

  async create(req: Request, res: Response) {
    try {
      const product = await this.productService.create(req.body);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const products = await this.productService.findAll();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // V FIX 2: Verificação para garantir que 'id' existe
      if (!id) {
        return res.status(400).json({ message: 'ID do produto é obrigatório' });
      }
      
      const product = await this.productService.findById(id); // Agora o TS sabe que 'id' é uma string
      return res.status(200).json(product);
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // V FIX 2: Verificação para garantir que 'id' existe
      if (!id) {
        return res.status(400).json({ message: 'ID do produto é obrigatório' });
      }

      const product = await this.productService.update(id, req.body);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // V FIX 2: Verificação para garantir que 'id' existe
      if (!id) {
        return res.status(400).json({ message: 'ID do produto é obrigatório' });
      }

      await this.productService.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }
}