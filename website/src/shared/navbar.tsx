import Image from "next/image";
import { useEffect, useState } from "react";
import style from "../styles/navbar.module.css";
import Link from "next/link";

export default function Navbar() {

    const [vis, setVis] = useState(true);

    useEffect(() => {
        if (window.innerWidth < 800) {
            setVis(false);
        } else {
            console.log(window.innerWidth)
        }
    }, [])

    return (
        <nav className={style.navbar}>
            <div className={style.logo} onClick={() => {
                if (window.innerWidth < 800) {
                    setVis(!vis)
                }
            }}>
                <div>
                <Image alt="Logo" height={80} width={80} src="/img/logo.png" />
                <Image alt="arrow" height={50} width={50} src="/img/down-arrow.png" className={style.arrow} />
                </div>
                
            </div>
            {
                vis &&
                <div className={style.buttons} onClick={() => {
                    if (window.innerWidth < 800) {
                        setVis(!vis)
                    }
                }}>
                    <Link href="/">Home</Link>
                    <Link href="/signup">Iscrizione</Link>
                    <Link href="/about">About</Link>
                    <Link href="/stats">Statistiche</Link>
                </div>}
        </nav>
    )
}