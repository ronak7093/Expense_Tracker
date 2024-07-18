import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MESSAGE_CONSTANT } from 'src/constant/message';
import { AddExpenseDto } from 'src/dto/addExpense.dto';
import { filterDto } from 'src/dto/filter.dto';
import { Expense } from 'src/models/expense.schema';
import { User } from 'src/models/user.schema';
import * as moment from "moment";

@Injectable()
export class ExpenseService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        @InjectModel('Expense') private expenseModel: Model<Expense>,
    ) { }

    async doCreateExpense(payload: AddExpenseDto, loginPayload) {
        const { _id } = loginPayload;
        let userRecord = await this.userModel.findOne({ _id: _id });

        if (!userRecord) {
            return {
                message: MESSAGE_CONSTANT.USER_NOT_FOUND,
                code: 404,
            };
        };

        let addExpense = await this.expenseModel.create({
            title: payload.title,
            amount: payload.amount,
            date: new Date(),
            userId: _id
        });

        return {
            data: addExpense,
            message: MESSAGE_CONSTANT.EXPENSE_ADD_SUCCESSFULLY,
            code: 200
        };
    }

    async doUpdateExpense(expenseId, payload: AddExpenseDto) {
        let expenseRecord = await this.expenseModel.findOne({
            _id: expenseId
        })

        if (!expenseRecord) {
            return {
                message: MESSAGE_CONSTANT.EXPENSE_NOT_FOUND,
                code: 400,
            }
        }

        let updateData = await this.expenseModel.findByIdAndUpdate(expenseId, payload, { new: true });

        return {
            data: updateData,
            message: MESSAGE_CONSTANT.EXPENSE_UPDATE_SUCCESSFULLY,
            code: 200,
        }
    }

    async doRemoveExpense(expenseId) {

        let expenseRecord = await this.expenseModel.findByIdAndDelete({
            _id: expenseId
        })

        if (!expenseRecord) {
            return {
                message: MESSAGE_CONSTANT.EXPENSE_NOT_FOUND,
                code: 400,
            }
        }

        return {
            message: MESSAGE_CONSTANT.EXPENSE_DELETE_SUCCESSFULLY,
            code: 200,
        }
    }

    async doFilterExpense(payload: filterDto, loginPayload) {

        const { _id } = loginPayload;
        const { startDate, endDate } = payload

        let fromDateFormatted = moment(startDate, 'DD-MM-YYYY').startOf('day').toDate();
        let toDateFormatted = moment(endDate, 'DD-MM-YYYY').endOf('day').toDate();

        let userRecord = await this.userModel.findOne({ _id: _id });

        if (!userRecord) {
            return {
                message: MESSAGE_CONSTANT.USER_NOT_FOUND,
                code: 404,
            };
        };

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
        }
    }
}
