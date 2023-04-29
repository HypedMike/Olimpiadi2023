import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import sponsors from "../assets/sponsors.json";
import { imageConfigDefault } from 'next/dist/shared/lib/image-config'

const inter = Inter({ subsets: ['latin'] })

function addDays(date: Date, days: number) {
  date.setDate(date.getDate() + days);
  return date;
}

export default function Home() {

  const [year, setYear] = useState(0);
  const [bg, setBg] = useState(Math.floor(Math.random() * 1 + 1));

  const [delay_value, setDelay] = useState<string>("0");

  useEffect(() => {
    let d = new Date("July 24, 2023");
    let last_d = new Date();
    let perc = 0;
    let inter = setInterval(() => {
      if (d.getTime() > last_d.getTime()) {
        last_d = addDays(last_d, 1);
        perc += 1;
      } else {
        clearInterval(inter);
      }
      setDelay(Math.round((perc) * 100 / 365).toString())
    }, 10)
  }, [])

  useEffect(() => {
    let y = 1000;
    let inter = setInterval(() => {
      if (++y <= 2023) {
        setYear(y);
      } else {
        clearInterval(inter);
      }
    }, 1)
  }, [])

  return (
    <>
      <Head>
        <title>Olimpiadi - SDL</title>
        <meta name="description" content="Olimpiadi di San Donato Lucca" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
      </Head>
      <main className={styles.body} style={{
        backgroundImage: "url('img/bg/bg" + bg + ".jpg')"
      }}>
        <header className={styles.header}>
          <div className={styles.context} >
            <div className={styles.header_content}>
              <h1>OLIMPIADI</h1>
              <h2>
                San Donato Lucca
              </h2>
              <h2>
                {year}
              </h2>
              <Link href={"/signup"}>ISCRIVITI</Link>
            </div>
            
          <div className={styles.sponsorspace_body}>
            Sponsors:
            <div className={styles.sponsorspace}>
              {
                sponsors.map((elem, index) => {
                  return (
                    <Sponsor key={index} name={elem.name} img={elem.img} link={elem.link} />
                  )
                })
              }
            </div>
          </div>
          </div>

          <div className={styles.area} >
            <ul className={styles.circles}>
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
          </div >
        </header>
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