import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Categories } from "./categorise.schema";

@Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })

export class Expense {

    @Prop()
    title: string;

    @Prop()
    amount: number;

    @Prop()
    date: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Categories' })
    categoriesId: Categories
}

export const expenseSchema = SchemaFactory.createForClass(Expense);