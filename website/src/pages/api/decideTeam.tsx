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

        let age: number = req.body.age;

        console.log(age);
        

        getUsers().then((r) => {

            console.log("all ages: ");
            r.forEach((elem, index) => {
                console.log(elem.getAge());
            })
            console.log("____");

            let teams_avg_age_with_plus = [
                getTeamAvgAgeWithPlus(r!.filter((a: Guest) => a.team == 0), age),
                getTeamAvgAgeWithPlus(r!.filter((a: Guest) => a.team == 1), age),
                getTeamAvgAgeWithPlus(r!.filter((a: Guest) => a.team == 2), age),
                getTeamAvgAgeWithPlus(r!.filter((a: Guest) => a.team == 3), age),
            ];

            console.log(teams_avg_age_with_plus);

            let result = [
                [0, (teams_avg_age_with_plus[0] + overallAverageAge(r!)) / 2],
                [1, (teams_avg_age_with_plus[1] + overallAverageAge(r!)) / 2],
                [2, (teams_avg_age_with_plus[2] + overallAverageAge(r!)) / 2],
                [3, (teams_avg_age_with_plus[3] + overallAverageAge(r!)) / 2],
            ]

            result.sort((a, b) => a[1] - b[1]);

            res.status(200).json(
                result[0][0]
            );
        }).catch((e) => {
            res.status(400).json("Something went wrong " + e);
        })
        
    }else{


        
        res.status(200).json("GET requests are not accepted");
    }
}

function overallAverageAge(guests: Guest[]){
    let sum = 0;
    guests.forEach((elem, index) => {
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
            )
        )
    });


    return guests;
}