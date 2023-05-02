import { Guest } from "@/util/users";
import { useEffect, useState } from "react"
import style from "../../styles/signup.module.css";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Signup() {

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const [user, setUser] = useState({
        name: "",
        surname: "",
        birthday: "",
        phonenumber: "",
        gender: "",
        email: "",
        sport: false,
        sport_def: "",
        file_iscrizione: "",
        file_assicurazione: "",
        legal_photos: false,
        team: 0
    });

    const [parent, setParent] = useState({
        parent_name: "",
        parent_surname: "",
        parent_phonenumber: ""
    })

    const [underage, setUnderage] = useState(false);

    useEffect(() => {
        let d = new Date(user.birthday);
        let now = Date.now();
        let age = Math.floor((- d + now) / (1000 * 60 * 60 * 24 * 365));
        if (age < 18 && d.getFullYear() > 1900) {
            setUnderage(true);
        } else {
            setUnderage(false);
        }
    }, [user.birthday])

    const send = () => {
        user.team = Math.floor(Math.random() * 4) + 1;



        if (user.name == "" || user.surname == "" || user.birthday == "" ||
            user.phonenumber == "" || user.gender == "" || user.email == ""
            || user.legal_photos == false) {
            alert("Compila tutti i campi");
            return;
        }

        let guest = new Guest(user.name, user.surname, new Date(user.birthday), user.email, user.team, user.phonenumber, user.gender, user.sport_def);
        if (guest.getAge() < 18) {
            guest.setParent(parent.parent_name, parent.parent_surname, parent.parent_phonenumber);
        }

        setLoading(true);

        fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify(guest)
        }).then((res) => {
            res.json().then((r) => {
                console.log(r);
                if (r.length == 1) {
                    alert("Iscrizione avvenuta con successo!");
                    setUser({
                        name: "",
                        surname: "",
                        birthday: "",
                        phonenumber: "",
                        gender: "",
                        email: "",
                        sport: false,
                        sport_def: "",
                        file_iscrizione: "",
                        file_assicurazione: "",
                        legal_photos: false,
                        team: 0
                    })
                    setLoading(false);
                    router.push("/signup/check/" + r[0].id);
                }
                else if(r == -2){
                    alert("Utente già presente");
                }
            }).catch((e) => { setLoading(false) })
        })
    }

    return (
        <div className={style.body}>
            <Head>
                <title>Iscrizione</title>
            </Head>
            <h1>Iscriviti ora all&apos;edizione 2023 delle Olimpiadi di San Donato!</h1>
            <div className={style.form}>
                <div className={style.attention}>
                    Scaricare e compilare il modulo assicurativo per completare l&apos;iscrizione. Dovrà essere inviato <b>compilato</b> all&apos;indirizzo email <a href="mailto:olimpiadisandonato@gmail.com">olimpiadisandonato@gmail.com</a>
                    <br></br>
                    <br></br>
                    <a href="/docs/assicurazione.pdf">modulo_assicurativo.pdf</a>
                    <h3>
                        L&apos;iscrizione online (sottostante) ed invio del PDF DOVRANNO essere inviati ENTRO E NON OLTRE la data di scadenza delle iscrizioni
                    </h3>
                    Nella schermata successiva all&apos;iscrizione potrete tenere traccia del processo di iscrizione
                </div>
                <input value={user.name} onChange={(e) => { setUser({ ...user, name: e.target.value }) }} placeholder="Nome" />
                <input value={user.surname} onChange={(e) => { setUser({ ...user, surname: e.target.value }) }} placeholder="Cognome" />

                <div>
                    Sei un ragazzo o un ragazza? <b>{user.gender != "" ? user.gender : null}</b>
                    <div>
                        <button style={{ backgroundColor: "transparent" }} onClick={() => { setUser({ ...user, gender: "maschio" }) }}>
                            <Image height={200} width={100} src="/img/male_avatar.PNG" alt="male" />
                        </button>
                        <button style={{ backgroundColor: "transparent" }} onClick={() => { setUser({ ...user, gender: "femmina" }) }}>
                            <Image height={200} width={100} src="/img/female_avatar.PNG" alt="female" />
                        </button>
                    </div>
                </div>

                <label>
                    Giochi a qualche sport?
                    <select onChange={(e) => {
                        setUser({ ...user, sport: e.target.value == "true" });
                    }}>
                        <option value={"false"}>No</option>
                        <option value={"true"}>Si</option>
                    </select>
                </label>
                {

                    user.sport ?

                        <label>
                            Quale sport?
                            <select onChange={(e) => { setUser({ ...user, sport_def: e.target.value }) }}>
                                <option value={"Calcio"}>Calcio</option>
                                <option value={"Tennis"}>Tennis</option>
                                <option value={"Basket"}>Basket</option>
                                <option value={"Piscina"}>Piscina</option>
                                <option value={"Pallavolo"}>Pallavolo</option>
                                <option value={"Atletica"}>Atletica</option>
                                <option value={"Altro"}>Altro</option>
                            </select>
                        </label>

                        :

                        null
                }
                <label>
                    Data di nascita
                    <input placeholder="Data di nascita" type={"date"} value={user.birthday} onChange={(e) => { setUser({ ...user, birthday: e.target.value }) }} />
                </label>
                {
                    underage &&
                    <div className={style.underageform}>
                        <h3>Modulo per minorenni</h3>
                        <input value={parent.parent_name} onChange={(e) => { setParent({ ...parent, parent_name: e.target.value }) }} placeholder="Nome genitore" />
                        <input value={parent.parent_surname} onChange={(e) => { setParent({ ...parent, parent_surname: e.target.value }) }} placeholder="Cognome genitore" />
                        <input type={"number"} value={parent.parent_phonenumber} onChange={(e) => { setParent({ ...parent, parent_phonenumber: e.target.value }) }} placeholder="Numero di telefono genitore" />
                    </div>
                }
                <input type={"number"} placeholder="Numero di telefono" value={user.phonenumber} onChange={(e) => { setUser({ ...user, phonenumber: e.target.value }) }} />
                <input placeholder="Email" value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />
                <label>
                    Liberatorio per l&apos;utilizzo delle foto sui social della parrocchia
                    <input checked={user.legal_photos} type={"checkbox"} onChange={(e) => { setUser({ ...user, legal_photos: e.target.checked }) }} />
                </label>
                {
                    loading ? null :
                        <button disabled={loading} onClick={send}>Invia</button>
                }
            </div>
        </div>
    )
}


