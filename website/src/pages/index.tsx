import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import sponsors from "../assets/sponsors.json";
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

function addDays(date: Date, days: number) {
  date.setDate(date.getDate() + days);
  return date;
}

export default function Home() {

  const [year, setYear] = useState(2000);
  const [bg, setBg] = useState(Math.floor(Math.random() * 1 + 1));

  const [currentSponsor, setCurrentSponsor] = useState<number>(0);

  const [delay_value, setDelay] = useState<string>("0");

  useEffect(() => {
    let y = 2000;
    const interval = setInterval(() => {
      if (y < 2023) {
        y += 1;
        setYear(Math.round(y));
      } else {
        setYear(2023);
        clearInterval(interval);
      }
    }, 100);

  }, []);

  useEffect(() => {
    setInterval(() => {
      setCurrentSponsor(Math.floor(Math.random() * sponsors.length));
    }, 4000)
  }, []);

  return (
    <>
      <Head>
        <title>Olimpiadi - SDL</title>
        <meta name="description" content="Olimpiadi di San Donato Lucca" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
      </Head>
      <main className={styles.body}>
        <header className={styles.header}>
          <div className={styles.context} >
            <div className={styles.header_content}>
              <div className={styles.alliance}>
                <Image width={300} height={300} alt='logo' src='/img/logo.png' />
                <div>🤝</div>
                <div className={styles.sponsorspace}>
                  {
                    (currentSponsor >= 0 && sponsors[currentSponsor] != undefined) && <Sponsor name={sponsors[currentSponsor].name} img={sponsors[currentSponsor].img} link={sponsors[currentSponsor].link} />
                  }
                </div>
              </div>
              <h2>
                {year}
              </h2>
              <div>
                <Link href={"/signup"}>ISCRIVITI</Link>
                <Link href={"/about"}>SCOPRI DI PIÙ</Link>
              </div>
            </div>

            <div className={styles.sponsorspace_body}>

            </div>
          </div>

          <div className={styles.area} >
            <ul className={styles.circles}>
              <Image width={100} height={100} alt='logo' src='/img/logo.png' />
              <Image width={100} height={100} alt='logo' src='/img/logo.png' />
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
              <Image width={100} height={100} alt='logo' src='/img/logo.png' />
            </ul>
          </div >
        </header>
        <div>
          <h1>Ma cosa succede alle olimpiadi?</h1>
          <h3>Lasciamo che siano le immagini a parlare!</h3>
          <iframe width="300" height="200" src="https://www.youtube.com/embed/ifVJXCtBwFQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          <iframe width="300" height="200" src="https://www.youtube.com/embed/SD5iZh8fZSs" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          <iframe width="300" height="200" src="https://www.youtube.com/embed/XnoNfGmbRLE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
        </div>
      </main>
    </>
  )
}

declare interface ISponsor {
  name: string;
  img: string;
  link: string;
}

function Sponsor(isp: ISponsor) {
  return (
    <article className={styles.sponsor} onClick={() => window.location.href = isp.link}>
      <img src={"img/sponsors_img/" + isp.img} />
      <div>{isp.name}</div>
    </article>
  )
}