import { Guest } from "@/util/users";
import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { BASE, PRIVATE_KEY } from "./env";


export default function Signup(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method == "POST"){
        //const body = JSON.parse(req.body);
        
        getUsers().then((r) => {
            res.status(200).json(r!);
        }).catch((e) => {
            res.status(400).json("Something went wrong " + e);
        })
        
    }else{


        
        res.status(200).json("GET requests are not accepted");
    }
}

async function getUsers(){
    const supabase = createClient(BASE, PRIVATE_KEY);
    
    let { data, error } = await supabase
    .from('guests')
    .select('*')

    let guests: Guest[] = [];

    data!.forEach(element => {
        guests.push(
            new Guest(
                element.name,
                element.surname,
                new Date(element.birthday),
                element.email,
                element.phonenumber,
            )
        )
    });


    return guests;
}