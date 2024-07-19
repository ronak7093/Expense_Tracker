import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { User } from 'src/models/user.schema';
import { Model } from 'mongoose';
import { MESSAGE_CONSTANT } from 'src/constant/message';
import { LoginUserDto } from 'src/dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
require("dotenv").config({ path: ".env" });

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @InjectModel('User') private userModel: Model<User>,
    ) { }


    async findById(id): Promise<User> {
        let record = await this.userModel.findOne({ _id: id });
        return record;
    }

    async doCreateUser(payload: CreateUserDto) {
        let userExists = await this.userModel.findOne({
            email: payload.email
        })

        if (userExists) {
            return {
                code: 404,
                message: MESSAGE_CONSTANT.USER_ALREADY_EXISTS,
                user: userExists
            }
        }

        if (!userExists) {
            userExists = await this.userModel.create({
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                password: payload.password,
                phoneNumber: payload.phoneNumber
            })

            return {
                code: 200,
                message: MESSAGE_CONSTANT.USER_REGISTER_SUCCESSFULLY,
                user: userExists
            }
        }
    }

    async doLoginUser(payload: LoginUserDto) {
        let userRecord = await this.userModel.findOne({
            email: payload.email
        })
        if (!userRecord) {
            return {
                code: 404,
                message: MESSAGE_CONSTANT.USER_NOT_FOUND,
            };
        };
        //@ts-ignore
        const isPasswordValid = await userRecord.comparePassword(payload.password);
        if (!isPasswordValid) {
            return {
                code: 401,
                message: MESSAGE_CONSTANT.INVALID_PASSWORD,
            };
        };

        //@ts-ignore
        let accessToken = await userRecord.generateToken();

        return {
            data: accessToken,
            message: MESSAGE_CONSTANT.USER_LOGIN_SUCCESSFULLY,
            code: 200,
        };
    }
}
