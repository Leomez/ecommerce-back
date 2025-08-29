import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }

  async create(data: CreateProductDto) {
    const { categoryIds, ...rest } = data;

    return this.prisma.product.create({
      data: {
        ...rest,
        categories: categoryIds && categoryIds.length > 0
          ? {
            create: categoryIds.map((categoryId) => ({
              category: { connect: { id: categoryId } }
            })),
          }
          : undefined,
      },
      include: { categories: true },
    });
  }

  findAll() {
    return this.prisma.product.findMany(
      {
        include: {
          categories: {
            include: {
              category: true, // trae los datos completos de la categoría
            },
          },
        },
      }
    );
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

  async addCategoriesToProduct(productId: number, categoryIds: number[]) {
    const data = categoryIds.map(categoryId => ({
      productId,
      categoryId,
    }));
    // Crea las relaciones en la tabla intermedia
    return this.prisma.productCategory.createMany({
      data,
      skipDuplicates: true, // evita duplicados si ya existe la relación
    });
  }

  async removeCategoryFromProduct(productId: number, categoryId: number) {
    return this.prisma.productCategory.delete({
      where: {
        productId_categoryId: { productId, categoryId },
      },
    });
  }


}