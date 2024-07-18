import { IsDate, IsNotEmpty } from '@nestjs/class-validator';

export class filterDto {

    @IsNotEmpty()
    @IsDate()
    startDate: Date;

    @IsNotEmpty()
    @IsDate()
    endDate: Date;
};
