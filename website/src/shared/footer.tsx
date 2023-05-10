import style from "../styles/footer.module.css";

export default function Footer(){
    return (
        <footer className={style.footer}>
            <div className={style.contacts}>
                Contatta gli amministratori
                <ul>
                    <li>
                        Reparto IT - <a href="tel:3463571877">Michele Saladino</a>
                    </li>
                    <li>
                        Reparto Sponsor - <a href="tel:3807885066">Alessandro Rugani</a>
                    </li>
                    <li>
                        Reparto Organizzazione - <a href="tel:3349707352">Marco Livolsi</a>
                    </li>
                </ul>
            </div>
            <div className={style.contacts}>
                Vuoi darci una mano?
                <p>
                    Scrivici alla seguente email <a href="mailto:olimpiadi.levele@gmail.com">olimpiadi.levele@gmail.com</a>
                </p>
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1130.9702069181674!2d10.483619497995464!3d43.83533373453726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d58543ae8c46cd%3A0x23aa0a7a9bf1407a!2sOratorio%20San%20Donato!5e0!3m2!1sit!2sit!4v1678279688497!5m2!1sit!2sit" width="600" height="450" loading="lazy" className={style.frame}></iframe>
        </footer>
    )
}