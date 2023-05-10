import { useEffect, useState } from "react"
import style from "../../styles/stats.module.css";
import Head from "next/head";

declare interface sportProps {
    sport: string;
    points: number;
}

interface teamInterface {
    name: string;
    sports: [string, number][];
    tot: number;
    members: string[];
}


export default function Stats(){

    const [loading, setLoading] = useState<boolean>(true);
    const [teams, setTeams] = useState<teamInterface[]>([]);

    useEffect(() => {
        fetch("/api/getstats").then((r) => {
            r.json()
            .then((res) => {
                setTeams(res);
            })
        })
    }, [])

    return (
        <div className={style.body}>
            <Head>
                <title>Statistiche</title>
            </Head>
            {
                teams.length > 0 && teams.map((element) => {
                    return <TeamCard key={element.name} members={element.members} name={element.name} sports={element.sports} tot={element.tot} />
                })
            }
        </div>
    )
}


function TeamCard(props: teamInterface){
    return (
        <article className={style.teamcard}>
            {props.name + " - " + props.tot}
            <div>
                {
                    props.sports.map((element) => {
                        return <Sport key={Math.random().toString()} sport={element[0]} points={element[1]} />
                    })
                }
            </div>
            <div className={style.members}>
                {
                    props.members.map((element) => {
                        return (
                            <section key={Math.random().toString()}>{element}</section>
                        )
                    })
                }
            </div>
        </article>
    )
}


function Sport(props: sportProps){
    return (
        <div className={style.sports}>
            <section>{props.sport}</section>
            <section>{props.points}</section>
        </div>
    )
}