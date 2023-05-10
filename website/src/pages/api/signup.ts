import { Guest } from "@/util/users";
import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

const supabase = createClient(process.env.BASE!, process.env.PRIVATE_KEY!);


export default function Signup(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method == "POST"){

        
        const guest = JSON.parse(req.body);
        


        InsertUser(guest).then((r) => {
            if(!r){
                res.status(500).json("Something went wrong");
            }else{
                res.status(200).json(r!);
            }
        })
        
    }else{


        
        res.status(200).json("GET requests are not accepted");
    }
}



async function InsertUser(guest: any){
    
    const { data, error } = await supabase
    .from('guests')
    .insert([
        { 
            name: guest.name, surname: guest.surname,
            birthday: guest.birthday, email: guest.email, 
            phonenumber: guest.phonenumber, gender: guest.gender,
            sport: guest.sport_def, parent_name: guest.parent_name,
            parent_surname: guest.parent_surname, parent_phonenumber: guest.parent_phonenumber,
            allergie: guest.allergie
        },
    ]).select()
    if(error){
        console.log(error);
        return false;
    }

    

    return data;
}
