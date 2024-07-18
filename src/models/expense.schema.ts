import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { CategoryType } from "src/enum/categeory.enum";
import { User } from "./user.schema";

@Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })

export class Expense {

    @Prop({ required: true, enum: CategoryType })
    title: CategoryType;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    date: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);