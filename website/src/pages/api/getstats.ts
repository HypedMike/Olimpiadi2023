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


        
        res.status(200).json("POST requests are not accepted");
    }
}

async function getStatsWrap(){
    const supabase = createClient(process.env.BASE!, process.env.PRIVATE_KEY!);
    
    let sports = await supabase
    .from('sports')
    .select('*')

    let teams = await supabase
    .from('teams')
    .select('*')

    let res: { sport: any; team: any; points: number}[] = [];

    //return sports;

    sports.data!.forEach(element => {
        res.push({
            sport: element.name,
            team: teams.data!.filter((a) => a.id == element.team)[0].name,
            points: element.points
        })
    })

    return res;
}