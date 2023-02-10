import style from "../styles/navbar.module.css";

export default function Navbar(){
    return (
        <nav className={style.navbar}>
            <div>
                <a href="/">Olimpiadi</a>
            </div>
            <div className={style.buttons}>
                <a href="/dashboard">Dashboard</a>
                <a href="/signin">Sign In</a>
            </div>
        </nav>
    )
}