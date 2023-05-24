import { Guest } from "@/util/users";
import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
    

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

function calculateAge(birthday: Date) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

async function getUsers(){
    const supabase = createClient(process.env.BASE!, process.env.PRIVATE_KEY!);
    
    let { data, error } = await supabase
    .from('guests')
    .select('*')

    interface GuestPublicInterface{
        name: string,
        surname: string,
        team: number,
        age: number,
        verified: boolean
    };

    let guests: GuestPublicInterface[] = [];

    if(data != null){
        data!.forEach(element => {
            guests.push({
                name: element.name,
                surname: element.surname.charAt(0),
                team: element.team,
                age: calculateAge(new Date(element.birthday)),
                verified: element.verified
            })
        });
    }

    return guests;
}