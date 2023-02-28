import { Guest } from "@/util/users";
import { useEffect, useState } from "react"
import style from "../../styles/signup.module.css";

export default function Signup(){

    const [user, setUser] = useState({
        name: "",
        surname: "",
        birthday: "",
        phonenumber: "",
        email: ""
    });

    const [parent, setParent] = useState({
        name: "",
        surname: "",
        pn: ""
    })

    const [underage, setUnderage] = useState(false);

    useEffect(() => {
        let d = new Date(user.birthday);
        let now = Date.now();
        let age = Math.floor((- d + now)/(1000 * 60 * 60 * 24 * 365));
        if(age < 18 && d.getFullYear() > 1900){
            setUnderage(true);
        }else{
            setUnderage(false);
        }
    }, [user.birthday])

    const send = () => {
        let guest = new Guest(user.name, user.surname, new Date(user.birthday), user.email, user.phonenumber);
        if(guest.getAge() < 18){
            guest.setParent(parent.name, parent.surname, parent.pn);
        }

        fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify(guest)
        }).then((res) => {
            res.json().then((r) => {
                console.log(r);
            })
        })
    }

    return (
        <div>
            <h1>Sign up</h1>
            <div>

            </div>
            <div className={style.form}>
                <input value={user.name} onChange={(e) => {setUser({...user, name: e.target.value})}} placeholder="Nome"/>
                <input value={user.surname} onChange={(e) => {setUser({...user, surname: e.target.value})}} placeholder="Cognome"/>
                <label>
                    Data di nascita
                    <input placeholder="Data di nascita" type={"date"} value={user.birthday} onChange={(e) => {setUser({...user, birthday: e.target.value})}}/>                    
                </label>
                {
                    underage &&
                    <div className={style.underageform}>
                        <h3>Modulo per minorenni</h3>
                        <input value={parent.name} onChange={(e) => {setParent({...parent, name: e.target.value})}} placeholder="Nome genitore"/>
                        <input value={parent.surname} onChange={(e) => {setParent({...parent, surname: e.target.value})}} placeholder="Cognome genitore"/>
                        <input type={"number"} value={parent.pn} onChange={(e) => {setParent({...parent, pn: e.target.value})}} placeholder="Numero di telefono genitore"/>
                    </div>
                }
                <input type={"number"} placeholder="Numero di telefono" value={user.phonenumber} onChange={(e) => {setUser({...user, phonenumber: e.target.value})}}/>
                <input placeholder="Email" value={user.email} onChange={(e) => {setUser({...user, email: e.target.value})}}/>
                <button onClick={send}>Invia</button>
            </div>
        </div>
    )
}