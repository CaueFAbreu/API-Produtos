import { prisma } from '../prismaClient.js';
import type { CreateProductDto } from '../dtos/CreateProductDto.js';
import type { UpdateProductDto } from '../dtos/UpdateProductDto.js';


export class ProductModel {

  async create(data: CreateProductDto) {
    return prisma.product.create({ data });
  }

  async findAll() {
    return prisma.product.findMany();
  }

  async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdateProductDto) {
    return prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.product.delete({
      where: { id },
    });
  }
}