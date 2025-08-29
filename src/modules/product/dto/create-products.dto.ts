import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    stock: number;

    @IsArray()
    @ValidateNested({ each: true })
    @IsOptional()
    @IsNumber({}, { each: true }) // 👈 aseguramos que sean ids de categorías
    categoryIds?: number[];
}
