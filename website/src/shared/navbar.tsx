import style from "../styles/navbar.module.css";

export default function Navbar(){
    return (
        <nav className={style.navbar}>
            <div className={style.logo}>Logo</div>
            <div className={style.buttons}>
                <button onClick={() => {window.location.href = "/"}}>Home</button>
                <button onClick={() => {window.location.href = "/signup"}}>Form</button>
                <button onClick={() => {window.location.href = "/about"}}>About</button>
                <button onClick={() => {window.location.href = "/stats"}}>Statistiche</button>
            </div>
        </nav>
    )
}