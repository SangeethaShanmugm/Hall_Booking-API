// export async function getRoomById(client, id) {
//     const result = await client.db('hallbooking').collection('rooms').findOne({ id: id });
//     console.log(" successfully viewed by ID", result);
//     return result;
// }
export async function getAllRoom(client, room) {
    const result = await client.db('hallbooking').collection('rooms').find({}).toArray();
    console.log(" successfully viewed by ID", result);
    return result;
}

export async function insertRoom(client, room) {
    const result = await client.db('hallbooking').collection('rooms').insertOne(room);
    console.log("inserted successfully", result);
    return result;
}

export async function getRoom(client, filter) {
    const result = await client.db("hallbooking").collection("rooms").findOne(filter);
    console.log("successfully matched", result);
    return result;
}


export async function updateRoom(client,room_id) {
    const result = await client.db("hallbooking").collection("rooms").updateOne({room_id:room_id },{$set:{bookedStatus:"true"}});
    console.log("successfully new room data updated", result);
    return result;
}

export async function bookRoom(client,room){
    const result = await client.db("hallbooking").collection("booked").insertOne(room);
    console.log("successfully room booked is inserted",result);
    return result;
}


export async function getRoomList (client,filter){
    const result = await client.db("hallbooking").collection("booked").find(filter).toArray();
    console.log("successfully room  list is obtanied",result);
    return result;
}



export async function getCustomerList (client,filter){
    const result = await client.db("hallbooking").collection("booked").find(filter,{booked_status:0}).toArray();
    console.log("successfully customer list is obtanied",result);
    return result;
}