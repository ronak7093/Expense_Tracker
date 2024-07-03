import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

export class User {

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop({ trim: true })
    email: string;

    @Prop({ minlength: 8, maxlength: 16 })
    password: string;

    @Prop({ length: 10 })
    phoneNumber: number;

    @Prop({ default: false })
    isActive: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);