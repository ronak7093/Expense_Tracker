/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import mongoose from 'mongoose';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { User } from 'src/models/user.schema';
import { Model } from 'mongoose';
import { LoginUserDto } from 'src/dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    private userModel;
    constructor(jwtService: JwtService, userModel: Model<User>);
    findById(id: any): Promise<User>;
    doCreateUser(payload: CreateUserDto): Promise<{
        code: number;
        message: string;
        user: mongoose.Document<unknown, {}, User> & User & {
            _id: mongoose.Types.ObjectId;
        };
    }>;
    doLoginUser(payload: LoginUserDto): Promise<{
        code: number;
        message: string;
        data?: undefined;
    } | {
        data: any;
        message: string;
        code: number;
    }>;
}
