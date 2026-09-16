import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import type { CreateProductDto } from '../../dtos/CreateProductDto.js';
import type { UpdateProductDto } from '../../dtos/UpdateProductDto.js';

// Formato mínimo de um produto vindo do Prisma, só com os campos que os testes usam.
type ProductRecord = {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
  createdAt: Date;
  updatedAt: Date;
};

// Mocks nomeados dos métodos do ProductModel, com assinatura explícita
// (sem isso o jest.fn() fica tipado como "never" e o TS reclama de "any").
const mockCreate = jest.fn<(data: CreateProductDto) => Promise<ProductRecord>>();
const mockFindAll = jest.fn<() => Promise<ProductRecord[]>>();
const mockFindById = jest.fn<(id: string) => Promise<ProductRecord | null>>();
const mockUpdate = jest.fn<(id: string, data: UpdateProductDto) => Promise<ProductRecord>>();
const mockDelete = jest.fn<(id: string) => Promise<ProductRecord>>();

// Mocka toda a camada de Model: o Service não deve depender do Prisma/banco real.
// Em ESM nativo, jest.mock() normal não é "hoisted" antes dos imports, então
// usamos jest.unstable_mockModule + import() dinâmico (padrão oficial do Jest para ESM).
jest.unstable_mockModule('../../models/ProductModel.js', () => ({
  ProductModel: jest.fn().mockImplementation(() => ({
    create: mockCreate,
    findAll: mockFindAll,
    findById: mockFindById,
    update: mockUpdate,
    delete: mockDelete,
  })),
}));

const { ProductService } = await import('../ProductService.js');

describe('ProductService', () => {
  let service: InstanceType<typeof ProductService>;

  const fakeProduct: ProductRecord = {
    id: 'abc123',
    nome: 'Mouse Gamer Pro',
    preco: 249.9,
    categoria: 'Periféricos',
    createdAt: new Date('2025-10-17T23:30:00.000Z'),
    updatedAt: new Date('2025-10-17T23:30:00.000Z'),
  };

  beforeEach(() => {
    mockCreate.mockReset();
    mockFindAll.mockReset();
    mockFindById.mockReset();
    mockUpdate.mockReset();
    mockDelete.mockReset();
    service = new ProductService();
  });

  describe('create', () => {
    it('deve repassar os dados para productModel.create e retornar o produto criado', async () => {
      const dto: CreateProductDto = { nome: 'Mouse Gamer Pro', preco: 249.9, categoria: 'Periféricos' };
      mockCreate.mockResolvedValue(fakeProduct);

      const result = await service.create(dto);

      expect(mockCreate).toHaveBeenCalledWith(dto);
      expect(result).toEqual(fakeProduct);
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os produtos vindos do model', async () => {
      mockFindAll.mockResolvedValue([fakeProduct]);

      const result = await service.findAll();

      expect(mockFindAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([fakeProduct]);
    });
  });

  describe('findById', () => {
    it('deve retornar o produto quando ele existe', async () => {
      mockFindById.mockResolvedValue(fakeProduct);

      const result = await service.findById(fakeProduct.id);

      expect(mockFindById).toHaveBeenCalledWith(fakeProduct.id);
      expect(result).toEqual(fakeProduct);
    });

    it('deve lançar erro quando o produto não existe', async () => {
      mockFindById.mockResolvedValue(null);

      await expect(service.findById('id-inexistente')).rejects.toThrow('Produto não encontrado');
    });
  });

  describe('update', () => {
    it('deve atualizar o produto quando ele existe', async () => {
      const dto: UpdateProductDto = { preco: 199.9 };
      const produtoAtualizado: ProductRecord = { ...fakeProduct, ...dto };

      mockFindById.mockResolvedValue(fakeProduct);
      mockUpdate.mockResolvedValue(produtoAtualizado);

      const result = await service.update(fakeProduct.id, dto);

      expect(mockFindById).toHaveBeenCalledWith(fakeProduct.id);
      expect(mockUpdate).toHaveBeenCalledWith(fakeProduct.id, dto);
      expect(result).toEqual(produtoAtualizado);
    });

    it('não deve chamar productModel.update quando o produto não existe', async () => {
      mockFindById.mockResolvedValue(null);

      await expect(service.update('id-inexistente', { preco: 10 })).rejects.toThrow(
        'Produto não encontrado',
      );
      expect(mockUpdate).not.toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('deve deletar o produto quando ele existe', async () => {
      mockFindById.mockResolvedValue(fakeProduct);
      mockDelete.mockResolvedValue(fakeProduct);

      const result = await service.delete(fakeProduct.id);

      expect(mockFindById).toHaveBeenCalledWith(fakeProduct.id);
      expect(mockDelete).toHaveBeenCalledWith(fakeProduct.id);
      expect(result).toEqual(fakeProduct);
    });

    it('não deve chamar productModel.delete quando o produto não existe', async () => {
      mockFindById.mockResolvedValue(null);

      await expect(service.delete('id-inexistente')).rejects.toThrow('Produto não encontrado');
      expect(mockDelete).not.toHaveBeenCalled();
    });
  });
});
