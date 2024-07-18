import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class UpdateCategoeryDto {
    @IsNotEmpty()
    @IsString({ message: 'Please Enter CategoeryName' })
    typeName: string;
};
