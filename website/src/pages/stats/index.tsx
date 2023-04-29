import { useEffect, useState } from "react"
import style from "../../styles/stats.module.css";

declare interface sportProps {
    sport: string;
    team: string;
    points: number;
}

export default function Stats(){

    const [data, setData] = useState<sportProps[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [teams, setTeams] = useState<string[]>([])

    useEffect(() => {
        fetch("/api/getstats").then((r) => {
            r.json()
            .then((res) => {
                console.log(res);
                setData(res);
                res.forEach((element: sportProps) => {
                    if(!teams.includes(element.team)){
                        let temp = teams;
                        temp.push(element.team);
                        setTeams(temp);
                    }
                });
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
            })
        })
    }, [])

    return (
        <div className={style.body}>
            {
                teams.sort((a, b) => {
                    return data.filter((c) => c.team == b)[0].points - data.filter((c) => c.team == a)[0].points
                }).map((elem, ind) => {
                    return (
                    <article key={ind*10}>
                        <h1>{elem}</h1>
                        {data.filter((a) => a.team == elem).map((element, index) => {
                            return (
                                <Sport key={index} sport={element.sport} team={element.team} points={element.points} />
                            )
                        })}
                    </article>
                )
                })
            }
        </div>
    )
}



function Sport(props: sportProps){
    return (
        <div>
            <section>{props.sport}</section>
            <section>{props.points}</section>
        </div>
    )
}