import {  getAllRoom, insertRoom, updateRoom,getRoom, bookRoom, getRoomList, getCustomerList} from "../helper.js";
import { createConnection } from '../index.js';
import express from 'express';
const router = express.Router();

//creating new Room details


router.route("/create").post(async (request, response) => {   
    const room=request.body;
    const client = await createConnection();
    const hallroom = await insertRoom(client,room);
    response.send(hallroom);
});

//Booking a Room based on date and time 

router.route("/roomBooking").post(async(request,response)=>{
    const {name,date,s_time,e_time,room_id}=request.body;
    
    const client =await createConnection();
    const isRoom = await getRoom(client,{room_id:room_id})
    if(!isRoom){
        response.send({message:"Invalid Room ID, please enter the room_id between 15 to 20!!!"})
    }
    else{
        
      if(isRoom.bookedStatus == "false")
      {
        const booked="booked";
    const rooms = await bookRoom(client,{customer_name:name,date:date,start_time:s_time,end_time:e_time,room_id:room_id,booked_status:booked});
       const updateRoomStatus= await updateRoom(client,room_id);
    response.send({message:"Congratulations!!! Room Booked Successfully",rooms:rooms,updateRoomStatus:updateRoomStatus});
      }
      else{
        response.send({message:"Room has already been Booked"})
      }
    }
});


//Listing all Room along with Booking status

router.route("/roomlist").get(async(request,response)=>{
    const client =await createConnection();
    const rooms = await getRoomList(client,{});
    response.send({message:"List of Rooms", rooms});
    
  });

//Listing all Customer details along with Booking status

router.route("/customerlist").get(async(request,response)=>{
    const client =await createConnection();
    const rooms = await getCustomerList(client,{});
    response.send({message:"List of Booked customer", rooms});
  });
  

router.route("/").get(async (request, response) => {
    const client = await createConnection();
    const hallroom = await getAllRoom(client);
    response.send(hallroom);
});


// router.route("/getRoom").get(async (request, response) => {
//     const room_id = request.params.room_id;
//     const client = await createConnection();
//     const hallroom = await getRoom(client, {room_id:room_id});
//     response.send(hallroom);
// });


// router.route("/:id").get(async (request, response) => {
//     const id = request.params.id;
//     const client = await createConnection();
//     const hallroom = await getRoomById(client, id);
//     response.send(hallroom);
// });

// router.route("/create").post(async(request,response)=>{
//     const {seats,amenities,price,room_id}=request.body;
//     const bookedStatus="false";
//     const clients =await createConnection();
//     const rooms = await insertRoom(clients,{seats,amenities,price,room_id,bookedStatus:bookedStatus});
//     response.send(rooms);
// });

export const roomRouter = router;