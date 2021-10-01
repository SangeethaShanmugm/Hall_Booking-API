import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import  { roomRouter } from './routes/room.js';
import { getAllRoom,insertRoom} from "./helper.js";


dotenv.config();

export const app = express();
const PORT = process.env.PORT;

app.use(express.json());

console.log("Welcome to the Hall Booking API");
// const rooms = [
//     {  id:"1", roomId: "103", amenities: ["TV","AC","Towels"],price:"120"},
//     { id:"2",roomId:"100", amenities: ["TV"],price:"250"},
//     { id:"3", roomId:"80",amenities: ["TV","Towels"],price:"380"},
//     { id:"4",roomId:"101", amenities: ["TV","AC"], price:"450"}
// ];


export async function createConnection(){
    const MONGO_URL = process.env.MONGO_URI;
    const client = new MongoClient(MONGO_URL);

    try{
        await client.connect();
        // const result = await client.db('hallbooking').collection('rooms').insertMany(rooms);
        // console.log("inserted successfully", result)
       return client;
    } catch(err){
console.log(err);
    }
}

app.use('/room', roomRouter );

app.listen(PORT, ()=> console.log("Server started in", PORT));

app.get("/", (request, response)=>{
    response.send("Welcome to Hall Booking App ")
});



