

import { Guest } from "@/util/users";
import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBheWp2Znh4b3d3eWdvbXdhYnpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc2MTI2MTEsImV4cCI6MTk5MzE4ODYxMX0.Rq4A3O7nhDB5ZTVGKkD2eJ26wSJWijOd-6E3U_23z9M";
const PRIVATE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBheWp2Znh4b3d3eWdvbXdhYnpwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NzYxMjYxMSwiZXhwIjoxOTkzMTg4NjExfQ.YGjw6og99McGmqjym9M6ekjIYlvwM9ElyLpTKxA-F2k";
const BASE = "https://payjvfxxowwygomwabzp.supabase.co";

export default function getUser(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "GET") {
        const {pid} = req.query;

        getUserAsync(Number.parseInt(pid as string)).then((r) => {
            if (!r) {
                res.status(500).json("Something went wrong");
            } else {
                res.status(200).json(r!);
            }
        })

    } else {

        res.status(404).json("Only get requests are accepted");
    }
}

async function getUserAsync(id: number) {
    const supabase = createClient(BASE, PRIVATE_KEY);

    let { data: guests, error } = await supabase
        .from('guests')
        .select('name, surname, verified')
        .eq('id', id);

        console.log(guests);

    if(error){
        console.log(error);
        return false;
    }

    if(guests?.length == 0){
        return false;
    }

    return guests![0];

}