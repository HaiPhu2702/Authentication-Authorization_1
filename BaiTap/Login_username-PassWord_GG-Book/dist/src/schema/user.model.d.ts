import mongoose from "mongoose";
declare const User: mongoose.Model<{
    username?: string;
    password?: string;
    google?: {
        id: StringConstructor;
    };
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    username?: string;
    password?: string;
    google?: {
        id: StringConstructor;
    };
}>>;
export { User };
