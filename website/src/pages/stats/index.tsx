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
        setLoading(true);
        fetch("/api/getstats").then((r) => {
            if(r.status !== 200){
                r.json().then((result) => {
                    alert("Errore nella richiesta: " + result);
                })
            }else{
                r.json()
                .then((res) => {
                    setTeams(res);
                    setLoading(false);
                }).catch((err) => {
                    console.log(err);
                    setLoading(false);
                })
            }
        })
    }, [])

    return (
        <div className={style.body}>
            <Head>
                <title>Statistiche</title>
            </Head>
            {
                loading ? <h1>Loading...</h1> : 
                
                <>
                <h2 style={{margin: "10px"}}>Il nostro algoritmo sta ancora calcolando un'equa distribuzione delle squadre. Le combinazioni di giocatori possono ancora cambiare!</h2>
                {(teams.length > 0 && teams.map((element) => {
                    return <TeamCard key={element.name} members={element.members} name={element.name} sports={element.sports} tot={element.tot} />
                }))}
                </>
            }
        </div>
    )
}


function TeamCard(props: teamInterface){

    const convertName = (name: string) => {
        switch(name.toLowerCase()){
            case "rossa":
                return "red";
            case "blu":
                return "rgb(43,89,195)";
            case "gialla":
                return "rgb(230,194,41)";
            case "verde":
                return "rgb(22,143,39)";
        }
    }

    return (
        <article className={style.teamcard} style={{backgroundColor: convertName(props.name)}}>
            {props.name + " - " + props.tot}
            <div>
                {
                    props.sports.length > 0 && props.sports.map((element) => {
                        return <Sport key={Math.random().toString()} sport={element[0]} points={element[1]} />
                    })
                }
            </div>
            <div className={style.members}>
                {
                    props.members.length > 0 && props.members.map((element) => {
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