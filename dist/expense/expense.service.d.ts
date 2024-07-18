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
import { Model } from 'mongoose';
import { AddExpenseDto } from 'src/dto/addExpense.dto';
import { filterDto } from 'src/dto/filter.dto';
import { Expense } from 'src/models/expense.schema';
import { User } from 'src/models/user.schema';
export declare class ExpenseService {
    private userModel;
    private expenseModel;
    constructor(userModel: Model<User>, expenseModel: Model<Expense>);
    doCreateExpense(payload: AddExpenseDto, loginPayload: any): Promise<{
        message: string;
        code: number;
        data?: undefined;
    } | {
        data: import("mongoose").Document<unknown, {}, Expense> & Expense & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
        code: number;
    }>;
    doUpdateExpense(expenseId: any, payload: AddExpenseDto): Promise<{
        message: string;
        code: number;
        data?: undefined;
    } | {
        data: import("mongoose").Document<unknown, {}, Expense> & Expense & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
        code: number;
    }>;
    doRemoveExpense(expenseId: any): Promise<{
        message: string;
        code: number;
    }>;
    doFilterExpense(payload: filterDto, loginPayload: any): Promise<{
        message: string;
        code: number;
        data?: undefined;
    } | {
        data: any[];
        message: string;
        code: number;
    }>;
}
