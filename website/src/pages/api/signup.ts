import { Guest } from "@/util/users";
import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBheWp2Znh4b3d3eWdvbXdhYnpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc2MTI2MTEsImV4cCI6MTk5MzE4ODYxMX0.Rq4A3O7nhDB5ZTVGKkD2eJ26wSJWijOd-6E3U_23z9M";
const PRIVATE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBheWp2Znh4b3d3eWdvbXdhYnpwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NzYxMjYxMSwiZXhwIjoxOTkzMTg4NjExfQ.YGjw6og99McGmqjym9M6ekjIYlvwM9ElyLpTKxA-F2k";
const BASE = "https://payjvfxxowwygomwabzp.supabase.co";

export default function Signup(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method == "POST"){
        const guest = JSON.parse(req.body);
        
        InsertUser(guest).then((r) => {
            console.log(r);
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

async function InsertUser(guest: Guest){
    const supabase = createClient(BASE, PRIVATE_KEY);
    
    const { data, error } = await supabase
    .from('guests')
    .insert([
        { name: guest.name, surname: guest.surname,
            birthday: guest.birthday, email: guest.email, 
            phonenumber: guest.phonenumber, gender: guest.gender,
            sport: guest.sport_def, parent_name: guest.parent_name,
            parent_surname: guest.parent_surname, parent_phonenumber: guest.parent_phonenumber
        },
    ])
    if(error){
        console.log(error);
        return false;
    }
    return data;
}