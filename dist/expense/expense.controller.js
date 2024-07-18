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
exports.ExpenseController = void 0;
const common_1 = require("@nestjs/common");
const expense_service_1 = require("./expense.service");
const addExpense_dto_1 = require("../dto/addExpense.dto");
const jwt_auth_guard_1 = require("../auth/jwt.auth.guard");
const auth_service_1 = require("../auth/auth.service");
const filter_dto_1 = require("../dto/filter.dto");
let ExpenseController = class ExpenseController {
    constructor(expenseServices, authServices) {
        this.expenseServices = expenseServices;
        this.authServices = authServices;
    }
    async addExpense(payload, req) {
        try {
            let response = await this.expenseServices.doCreateExpense(payload, req.user);
            return response;
        }
        catch (error) {
            console.log(error, 'error');
            throw new common_1.HttpException(error, 400);
        }
    }
    async updateExpense(expenseId, payload) {
        try {
            let response = await this.expenseServices.doUpdateExpense(expenseId, payload);
            return response;
        }
        catch (error) {
            console.log(error, 'error');
            throw new common_1.HttpException(error, 400);
        }
    }
    async removeExpense(expenseId) {
        try {
            let response = await this.expenseServices.doRemoveExpense(expenseId);
            return response;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error, 400);
        }
    }
    async filterList(payload, req) {
        try {
            let response = await this.expenseServices.doFilterExpense(payload, req.user);
            return response;
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error, 400);
        }
    }
};
exports.ExpenseController = ExpenseController;
__decorate([
    (0, common_1.Post)('/add'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addExpense_dto_1.AddExpenseDto, Object]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "addExpense", null);
__decorate([
    (0, common_1.Put)('/:Eid'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('Eid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, addExpense_dto_1.AddExpenseDto]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "updateExpense", null);
__decorate([
    (0, common_1.Delete)('/:Eid'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('Eid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "removeExpense", null);
__decorate([
    (0, common_1.Post)('/list'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_dto_1.filterDto, Object]),
    __metadata("design:returntype", Promise)
], ExpenseController.prototype, "filterList", null);
exports.ExpenseController = ExpenseController = __decorate([
    (0, common_1.Controller)('expense'),
    __metadata("design:paramtypes", [expense_service_1.ExpenseService,
        auth_service_1.AuthService])
], ExpenseController);
//# sourceMappingURL=expense.controller.js.map