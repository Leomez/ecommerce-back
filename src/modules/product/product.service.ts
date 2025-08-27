import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProductDto) {
    return this.prisma.product.create({ data });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException(`prducto con id ${id} no encontrado`);
    return product;
  }

  async update(id: number, data: UpdateProductDto) {
    await this.findOne(id); // Verifica si el producto existe
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica si el producto existe
    return this.prisma.product.delete({ where: { id } });
  }
}