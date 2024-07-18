import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.schema';
import { ExpenseSchema } from 'src/models/expense.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Expense', schema: ExpenseSchema },
    ]),
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService, AuthService, JwtService]
})
export class ExpenseModule { }
