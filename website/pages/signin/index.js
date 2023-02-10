import {Button, Stack} from "@mui/material"
import { useEffect, useState } from "react";
import style from "../../styles/signin.module.css";

export default function Signin(){

    const [kid, setKid] = useState({
        name: "",
        surname: "",
        phonenumber: "",
        date: "2005-01-07",
    })

    const [parentVisible, setParentVisible] = useState(false);

    const [parent, setParent] = useState({
        gender: 0,
        name: "",
        name: "",
        phonenumber: ""
    })

    useEffect(() => {

        if(kid.date.split("-").length == 3 && kid.date.split("-")[0] > 2005){
            setParentVisible(true);
        }else{
            setParentVisible(false);
        }
    }, [kid.date])


    const parentForm = () => {
        return (
            <>
                <select className={style.selectfield}>
                    <option>Madre</option>
                    <option>Padre</option>
                </select>
                <input className={style.textfield} placeholder="Nome genitore" />
                <input className={style.textfield} placeholder="Cognome genitore" />
                <input className={style.textfield} placeholder="Numero di telefono genitore" />
            </>
        )
    }

    return (
        <Stack justifyContent={"center"} textAlign="center" alignContent={"center"} alignItems="center">
            <p className={style.info}>
                Compilare il qui presente modulo di iscrizione per poter
                partecipare alle Olimpiadi di San Donato.

                <br></br>
                <br></br>

                Riceverete una mail di conferma entro 48 ore dall&aposiscrizione

                <br></br>
                <br></br>

                Si ricorda che le squadre verranno scelte <b>casualmente</b> dalla 
                commissione olimpionica
            </p>
            <input className={style.textfield} placeholder="Nome" />
            <input className={style.textfield} placeholder="Cognome" />
            <input className={style.textfield} placeholder="Numero di telefono" />
            <input className={style.textfield} value={kid.date} onChange={(e) => {setKid({...kid, date: e.target.value})}} type="date" placeholder="Data di nascita" />
            {parentVisible && parentForm()}
            <input className={style.textfield} placeholder="Email" />
            <input className={style.textfield} type="submit" value={"REGISTRATI"} />
            <p className={style.info}>
                Premendo iscriviti accetti i termini e condizioni <a href="#" style={{textDecoration: "underline"}}>qui riportati</a>
            </p>
        </Stack>
    )
}