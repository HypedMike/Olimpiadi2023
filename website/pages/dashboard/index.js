import { SportCard } from "../../shared/cards";
import style from "../../styles/dashboard.module.css";

export default function Dashboard(){

    const sport = {
        img: null,
        title: "basket",
        description: "short description"
    }

    return (
        <div className={style.body}>
            <h1>
                In questa pagina puoi vedere tutte le statistiche relative a te ed alla tua squadra!
            </h1>

            <div>
                <SportCard sport={sport}/>
            </div>

        </div>
    )
}