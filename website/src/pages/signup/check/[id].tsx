import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Context, useState } from "react";
import { TypeFlags } from "typescript";
import style from "@/styles/signupcheck.module.css";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context;
    const id = query.id;
  
    const fetched_user = await (await fetch('http://localhost:3000/api/getuser/' + (id as string))).json() as UserInterface;

    // Get the query parameter from the query object
  
    // Return the props with the query parameter
    return {
      props: {
        fetched_user,
      },
    };
  };
  

interface UserInterface{
    name: string;
    surname: string;
    verified: boolean;
}

export default function CheckUser({fetched_user}: InferGetServerSidePropsType<typeof getServerSideProps>){
    const [user, setUser] = useState<UserInterface | null>(fetched_user);

    if(user!.name == undefined || user!.surname == undefined){
      return (
        <div className={style.area}>
          <header className={style.header}>
            Penso ci sia qualcosa che non vada con il link!
          </header>
        </div>
      )
    }

    return (
        <div className={style.area}>

          <Head>
            <title>Controlla iscrizione</title>
          </Head>
          <header className={style.header}>
            {user!.name + " " + user!.surname}
            <div>
              {
                user!.verified ? "Complimenti! Sei dentro!" :
                "Sei in fase di accettazione della richiesta! Salva il link di questa pagina per tenere traccia della tua richiesta!"
              }
            </div>
            <div style={{
              marginTop: "30px"
            }}>
              Hai delle domande? Non esitare a contattarci!
              <br></br>
              <a style={{color: "white"}} href="mailto:olimpiadisandonato@gmail.com">olimpiadisandonato@gmail.com</a>
            </div>
          </header>
            <ul className={style.circles}>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
        </div>
    )
    
}
