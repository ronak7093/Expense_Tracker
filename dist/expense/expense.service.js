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
exports.ExpenseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const message_1 = require("../constant/message");
const moment = require("moment");
let ExpenseService = class ExpenseService {
    constructor(userModel, expenseModel) {
        this.userModel = userModel;
        this.expenseModel = expenseModel;
    }
    async doCreateExpense(payload, loginPayload) {
        const { _id } = loginPayload;
        let userRecord = await this.userModel.findOne({ _id: _id });
        if (!userRecord) {
            return {
                message: message_1.MESSAGE_CONSTANT.USER_NOT_FOUND,
                code: 404,
            };
        }
        ;
        let addExpense = await this.expenseModel.create({
            title: payload.title,
            amount: payload.amount,
            date: new Date(),
            userId: _id
        });
        return {
            data: addExpense,
            message: message_1.MESSAGE_CONSTANT.EXPENSE_ADD_SUCCESSFULLY,
            code: 200
        };
    }
    async doUpdateExpense(expenseId, payload) {
        let expenseRecord = await this.expenseModel.findOne({
            _id: expenseId
        });
        if (!expenseRecord) {
            return {
                message: message_1.MESSAGE_CONSTANT.EXPENSE_NOT_FOUND,
                code: 400,
            };
        }
        let updateData = await this.expenseModel.findByIdAndUpdate(expenseId, payload, { new: true });
        return {
            data: updateData,
            message: message_1.MESSAGE_CONSTANT.EXPENSE_UPDATE_SUCCESSFULLY,
            code: 200,
        };
    }
    async doRemoveExpense(expenseId) {
        let expenseRecord = await this.expenseModel.findByIdAndDelete({
            _id: expenseId
        });
        if (!expenseRecord) {
            return {
                message: message_1.MESSAGE_CONSTANT.EXPENSE_NOT_FOUND,
                code: 400,
            };
        }
        return {
            message: message_1.MESSAGE_CONSTANT.EXPENSE_DELETE_SUCCESSFULLY,
            code: 200,
        };
    }
    async doFilterExpense(payload, loginPayload) {
        const { _id } = loginPayload;
        const { startDate, endDate } = payload;
        let fromDateFormatted = moment(startDate, 'DD-MM-YYYY').startOf('day').toDate();
        let toDateFormatted = moment(endDate, 'DD-MM-YYYY').endOf('day').toDate();
        let userRecord = await this.userModel.findOne({ _id: _id });
        if (!userRecord) {
            return {
                message: message_1.MESSAGE_CONSTANT.USER_NOT_FOUND,
                code: 404,
            };
        }
        ;
        let expensRecord = await this.expenseModel.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(new Date(fromDateFormatted).setHours(0, 0, 0, 0)),
                        $lte: new Date(new Date(toDateFormatted).setHours(23, 59, 59, 999)),
                    }
                }
            },
            {
                $sort: {
                    date: 1,
                }
            },
            {
                $project: {
                    title: 1,
                    amount: 1,
                    formattedDate: {
                        $dateToString: { format: "%d-%m-%Y", date: "$date" }
                    }
                }
            }
        ]);
        return {
            data: expensRecord,
            message: 'Success',
            code: 200
        };
    }
};
exports.ExpenseService = ExpenseService;
exports.ExpenseService = ExpenseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Expense')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ExpenseService);
//# sourceMappingURL=expense.service.js.map