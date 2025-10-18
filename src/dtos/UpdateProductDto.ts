export interface UpdateProductDto {
  nome?: string; // O '?' torna o campo opcional
  preco?: number;
  categoria?: string;
}