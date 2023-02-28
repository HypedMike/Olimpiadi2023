import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Olimpiadi - SDL</title>
        <meta name="description" content="Olimpiadi di San Donato Lucca" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <header className={styles.header}>
          <div>
            <div>
              Sei pronto a rimetterti in gioco?
            </div>
            <h1>Olimpiadi</h1>
            <h2>
              San Donato Lucca
            </h2>
            <Link href='/about'>Learn more</Link>
            <Link href='/signup'>Sign up</Link>
          </div>
        </header>
      </main>
    </>
  )
}
