import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";


export default function getStats(
    req: NextApiRequest,
    res: NextApiResponse
){
    if(req.method == "GET"){
        //const body = JSON.parse(req.body);
        getStatsWrap().then((r) => {
            console.log("about to send " + r);
            res.status(200).json(r!);
        }).catch((e) => {
            res.status(400).json("Something went wrong " + e);
        })
        
    }else{


        
        res.status(400).json("POST requests are not accepted");
    }
}

async function getStatsWrap(){
    const supabase = createClient(process.env.BASE!, process.env.PRIVATE_KEY!);

    console.log(process.env.BASE);
    console.log(process.env.PRIVATE_KEY);
  
    let {data, error} = await supabase
    .from('sports')
    .select('*')

    interface teamInterface {
        name: string;
        sports: [string, number][];
        tot: number;
        members: string[];
    }

    let res: teamInterface[] = [
        {
            name: "rossa",
            sports: [],
            tot: 0,
            members: []
        },
        {
            name: "blu",
            sports: [],
            tot: 0,
            members: []
        },
        {
            name: "gialla",
            sports: [],
            tot: 0,
            members: []
        },
        {
            name: "verde",
            sports: [],
            tot: 0,
            members: []
        }
    ];

    const addSportToTeam = (sport: string, score: number, team: string) => {

        var id = 0;

        switch(team){
            case "rossa":
                id = 0;
                break;
            case "blu":
                id = 1;
                break;
            case "gialla":
                id = 2;
                break;
            case "verde":
                id = 3;
                break;
        }

        res[id].sports.push([sport, score]);
    }

    if(data != null){
        data!.forEach(element => {
            addSportToTeam(element.name, element.rossa, "rossa");
            addSportToTeam(element.name, element.blu, "blu");
            addSportToTeam(element.name, element.gialla, "gialla");
            addSportToTeam(element.name, element.verde, "verde");
        });
    }
    

    let guests = await (await fetch(process.env.BASEPATH! + "api/getusers/", {
        method: "POST",
    })).json();

    guests.filter((element: any) => element.verified).forEach((element: any) => {
        res[element.team - 1].members.push(element.name + " " + element.surname);
    });

    return res;
}