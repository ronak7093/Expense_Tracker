import { IsNotEmpty, IsString, IsPhoneNumber } from '@nestjs/class-validator';

export class CreateUserDto {
    @IsString({ message: 'Please Enter firstName' })
    firstName: string;

    @IsString({ message: 'Please Enter lastName' })
    lastName: string;

    @IsNotEmpty({ message: 'Please Enter Email' })
    @IsString()
    email: string;

    @IsString({ message: 'Please Enter Password' })
    password: string;

    @IsPhoneNumber(null, { message: 'Invalid phoneNumber' })
    phoneNumber: Number;
}
