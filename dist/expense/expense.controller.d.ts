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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { ExpenseService } from './expense.service';
import { AddExpenseDto } from 'src/dto/addExpense.dto';
import { AuthService } from 'src/auth/auth.service';
import { filterDto } from 'src/dto/filter.dto';
export declare class ExpenseController {
    private readonly expenseServices;
    private readonly authServices;
    constructor(expenseServices: ExpenseService, authServices: AuthService);
    addExpense(payload: AddExpenseDto, req: any): Promise<{
        message: string;
        code: number;
        data?: undefined;
    } | {
        data: import("mongoose").Document<unknown, {}, import("../models/expense.schema").Expense> & import("../models/expense.schema").Expense & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
        code: number;
    }>;
    updateExpense(expenseId: any, payload: AddExpenseDto): Promise<{
        message: string;
        code: number;
        data?: undefined;
    } | {
        data: import("mongoose").Document<unknown, {}, import("../models/expense.schema").Expense> & import("../models/expense.schema").Expense & {
            _id: import("mongoose").Types.ObjectId;
        };
        message: string;
        code: number;
    }>;
    removeExpense(expenseId: any): Promise<{
        message: string;
        code: number;
    }>;
    filterList(payload: filterDto, req: any): Promise<{
        message: string;
        code: number;
        data?: undefined;
    } | {
        data: any[];
        message: string;
        code: number;
    }>;
}
