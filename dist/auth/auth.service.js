"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const message_1 = require("../constant/message");
const jwt_1 = require("@nestjs/jwt");
require("dotenv").config({ path: ".env" });
let AuthService = class AuthService {
    constructor(jwtService, userModel) {
        this.jwtService = jwtService;
        this.userModel = userModel;
    }
    async findById(id) {
        let record = await this.userModel.findOne({ _id: id });
        return record;
    }
    async doCreateUser(payload) {
        let userExists = await this.userModel.findOne({
            email: payload.email
        });
        if (userExists) {
            return {
                code: 404,
                message: message_1.MESSAGE_CONSTANT.USER_ALREADY_EXISTS,
                user: userExists
            };
        }
        if (!userExists) {
            userExists = await this.userModel.create({
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                password: payload.password,
                phoneNumber: payload.phoneNumber
            });
            return {
                code: 200,
                message: message_1.MESSAGE_CONSTANT.USER_REGISTER_SUCCESSFULLY,
                user: userExists
            };
        }
    }
    async doLoginUser(payload) {
        try {
            let userRecord = await this.userModel.findOne({
                email: payload.email
            });
            if (!userRecord) {
                return {
                    code: 404,
                    message: message_1.MESSAGE_CONSTANT.USER_NOT_FOUND,
                };
            }
            const isPasswordValid = await userRecord.comparePassword(payload.password);
            if (!isPasswordValid) {
                return {
                    code: 401,
                    message: message_1.MESSAGE_CONSTANT.INVALID_PASSWORD,
                };
            }
            const token = { id: userRecord._id, email: userRecord.email };
            let accessToken = await this.jwtService.sign(token, {
                secret: process.env.JWT_SECRET_KEY,
                expiresIn: "1w",
            });
            return {
                data: accessToken,
                message: message_1.MESSAGE_CONSTANT.USER_LOGIN_SUCCESSFULLY,
                code: 200,
            };
        }
        catch (error) {
            console.log(error, 'error>>>>>>>');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map