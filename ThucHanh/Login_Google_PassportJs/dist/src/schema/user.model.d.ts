import mongoose from "mongoose";
declare const User: mongoose.Model<{
    username?: string;
    password?: string;
    google?: {
        id: {
            type: StringConstructor;
        };
    };
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, any, {}, "type", {
    username?: string;
    password?: string;
    google?: {
        id: {
            type: StringConstructor;
        };
    };
}>>;
export { User };
