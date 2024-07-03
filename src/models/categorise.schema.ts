import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./user.schema";

@Schema({ timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } })

export class Categories {

    @Prop()
    typeName: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);