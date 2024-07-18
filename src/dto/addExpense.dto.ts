import { IsEnum, IsNotEmpty, IsNumber } from '@nestjs/class-validator';
import { CategoryType } from 'src/enum/categeory.enum';

export class AddExpenseDto {
    @IsNotEmpty()
    @IsEnum(CategoryType)
    title: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number
};
