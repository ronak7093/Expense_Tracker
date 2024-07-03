import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URL, {
            dbName: process.env.MONGO_DATABASENAME,
        }),
    ],
    exports: [],
})
export class DatabaseModule { }
