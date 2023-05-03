import mongoose from "mongoose";

mongoose.connect("mongodb+srv://lunievas:123@node-api.xmbpb66.mongodb.net/Projeto-Api");

let db = mongoose.connection;

export default db;