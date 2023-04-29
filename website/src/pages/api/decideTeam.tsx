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
            res.status(200).json(
                Math.floor(Math.random()*4)
            );
        }).catch((e) => {
            res.status(400).json("Something went wrong " + e);
        })
        
    }else{


        
        res.status(200).json("GET requests are not accepted");
    }
}

function calcTeamAvg(guests: Guest[], team: number){
    let sum = 0;
    guests.filter((a) => a.team = team).forEach((elem, index) => {
        sum += elem.getAge();
    })
    return sum / guests.length;
}

function getTeamAvgAgeWithPlus(guests: Guest[], guest_age: number){

    let avg: number = guest_age;

    guests.forEach((elem: Guest, index) => {
        console.log(avg, elem.getAge());
        avg = +avg + (+elem.getAge());
        console.log("sum is " + avg);
    })

    console.log("avg is: " + avg);
    console.log("avg is _ : " + avg / (guests.length + 1));

    return avg/(guests.length + 1);
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
                element.team,
                element.phonenumber,
                element.gender,
                element.sport
            )
        )
    });


    return guests;
}