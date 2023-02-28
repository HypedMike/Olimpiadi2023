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
        const body = JSON.parse(req.body);
        let guest = new Guest(body.name, body.surname, new Date(body.birthday), body.email, body.phonenumber);
        
        InsertUser(guest).then((r) => {
            res.status(200).json(r!);
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
        { name: guest.name, surname: guest.surname },
    ])
    return data;
}