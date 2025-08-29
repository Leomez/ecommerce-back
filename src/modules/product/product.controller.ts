import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('productos')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
  @Patch(':id/categorias')
  async addCategories(
    @Param('id') id: string,
    @Body('categoryIds') categoryIds: number[]
  ) {
    return this.productService.addCategoriesToProduct(+id, categoryIds);
  }

  @Delete(':id/categorias/:categoryId')
  async removeCategory(
    @Param('id') id: string,
    @Param('categoryId') categoryId: string
  ) {
    return this.productService.removeCategoryFromProduct(+id, +categoryId);
  }
  //Uso: Hacer una petición DELETE a /productos/{id}/categorias/{categoryId} para quitar la categoría {categoryId} del producto {id}.
}
