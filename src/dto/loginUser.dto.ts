import { IsNotEmpty, IsString, IsPhoneNumber } from '@nestjs/class-validator';

export class LoginUserDto {
    @IsNotEmpty({ message: 'Please Enter Email' })
    @IsString()
    email: string;

    @IsString({ message: 'Please Enter Password' })
    password: string;
}
