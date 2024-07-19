import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
require("dotenv").config({ path: ".env" });

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

export class User {

    @Prop({ required: true, trim: true })
    firstName: string;

    @Prop({ required: true, trim: true })
    lastName: string;

    @Prop({ required: true, trim: true, unique: true })
    email: string;

    @Prop({ required: true, minlength: 8, maxlength: 16 })
    password: string;

    @Prop({ required: true, length: 10 })
    phoneNumber: number;

    @Prop({ default: false })
    isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Middleware to hash the password before saving

UserSchema.pre('save', async function (next) {
    const user = this as any;
    if (!user.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

// Middleware to use compare password 

UserSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        console.log(error, 'error');
        throw new Error(error);
    }
}

// generate token 
UserSchema.methods.generateToken = async function () {
    const accessToken = jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE });
    return accessToken;
};