import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { LoginUserDto } from 'src/dto/loginUser.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authServices: AuthService
    ) { }

    @Post('/register')
    async crateUser(@Body() req: CreateUserDto) {
        try {
            let response = await this.authServices.doCreateUser(req);
            return response;
        } catch (error) {
            console.log(error, 'error');
            throw new HttpException(error, 400);
        }
    }

    @Post('/login')
    async loginUser(@Body() req: LoginUserDto) {
        try {
            let response = await this.authServices.doLoginUser(req);
            return response;
        } catch (error) {
            console.log(error, 'error');
            throw new HttpException(error, 400);
        }
    }
}
