import { Body, Controller, Delete, HttpException, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { AddExpenseDto } from 'src/dto/addExpense.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { filterDto } from 'src/dto/filter.dto';

@Controller('expense')
export class ExpenseController {

    constructor(
        private readonly expenseServices: ExpenseService,
        private readonly authServices: AuthService
    ) { }

    @Post('/add')
    @UseGuards(JwtAuthGuard)
    async addExpense(@Body() payload: AddExpenseDto, @Request() req) {
        try {
            let response = await this.expenseServices.doCreateExpense(payload, req.user);
            return response;
        } catch (error) {
            console.log(error, 'error');
            throw new HttpException(error, 400);
        }
    }

    @Put('/:Eid')
    @UseGuards(JwtAuthGuard)
    async updateExpense(
        @Param('Eid') expenseId,
        @Body() payload: AddExpenseDto
    ) {
        try {
            let response = await this.expenseServices.doUpdateExpense(expenseId, payload);
            return response;
        } catch (error) {
            console.log(error, 'error');
            throw new HttpException(error, 400);
        }
    }

    @Delete('/:Eid')
    @UseGuards(JwtAuthGuard)
    async removeExpense(@Param('Eid') expenseId) {
        try {
            let response = await this.expenseServices.doRemoveExpense(expenseId);
            return response;

        } catch (error) {
            console.log(error);
            throw new HttpException(error, 400);
        }
    }


    @Post('/list')
    @UseGuards(JwtAuthGuard)
    async filterList(@Body() payload: filterDto, @Request() req) {
        try {
            let response = await this.expenseServices.doFilterExpense(payload, req.user);
            return response;

        } catch (error) {
            console.log(error);
            throw new HttpException(error, 400);
        }
    }
}
