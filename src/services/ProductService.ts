import { ProductModel } from '../models/ProductModel.js';
import type { CreateProductDto } from '../dtos/CreateProductDto.js';
import type { UpdateProductDto } from '../dtos/UpdateProductDto.js';


export class ProductService {
 
  private productModel = new ProductModel();

  async create(data: CreateProductDto) {
    
    return this.productModel.create(data);
  }

  async findAll() {
    return this.productModel.findAll();
  }

  async findById(id: string) {
    const product = await this.productModel.findById(id);

   
    if (!product) {
      throw new Error('Produto não encontrado'); 
    }
    return product;
  }

  async update(id: string, data: UpdateProductDto) {
    // Garantir que o produto existe antes de tentar atualizar.
    // Reutilizamos o método findById (que já tem a verificação).
    await this.findById(id); 

    return this.productModel.update(id, data);
  }

  async delete(id: string) {
    //Garantir que o produto existe antes de deletar.
    await this.findById(id); 

    return this.productModel.delete(id);
  }
}