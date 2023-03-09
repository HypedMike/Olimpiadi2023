import Image from "next/image";
import { useEffect, useState } from "react";
import style from "../styles/navbar.module.css";

export default function Navbar(){

    const [vis, setVis] = useState(true);

    useEffect(() => {
        if(window.innerWidth < 800){
            setVis(false);
        }else{
            console.log(window.innerWidth)
        }
    }, [])

    return (
        <nav className={style.navbar}>
            <div className={style.logo} onClick={() => {
                if(window.innerWidth < 800){
                    setVis(!vis)
                }
            }}><Image alt="Logo" height={80} width={80} src="/img/logo.png" /></div>
            {
            vis &&     
            <div className={style.buttons}>
                <button onClick={() => {window.location.href = "/"}}>Home</button>
                <button onClick={() => {window.location.href = "/signup"}}>Form</button>
                <button onClick={() => {window.location.href = "/about"}}>About</button>
                <button onClick={() => {window.location.href = "/stats"}}>Statistiche</button>
            </div>}
        </nav>
    )
}