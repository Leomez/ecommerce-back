import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }

  // CRUD básico para categorías
  create(data: CreateCategoryDto) {
    return this.prisma.category.create({ data });
  }

  findAll() {
    return this.prisma.category.findMany({
      include: { products: true },
    });
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });
  }

  update(id: number, data: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }

  // Métodos para gestionar la relación entre categorías y productos
  async addProductToCategory(categoryId: number, productId: number) {
    await this.prisma.productCategory.update({
      where: { productId_categoryId: { categoryId, productId } },
      data: { categoryId, productId },      
    });      
  }

  async removeProductFromCategory(categoryId: number, productId: number) {
    await this.prisma.productCategory.delete({
      where: { productId_categoryId: { categoryId, productId } },
    });
  }
}


