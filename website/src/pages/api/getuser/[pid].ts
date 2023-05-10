

import { Guest } from "@/util/users";
import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

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
    const supabase = createClient(process.env.BASE!, process.env.PRIVATE_KEY!);

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
