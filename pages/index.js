import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth, firestore, fromMillis, expenseToJSON} from '../lib/firebase'
import { useState, useEffect } from 'react';

export default function Home(props) {
  const { user, username } = useContext(UserContext)
  const router = useRouter();
  const signOut = () => {
    router.push("./");
    auth.signOut();
  }

  return (   
    <main>
      <h2>Landing Page Placeholder</h2>
      <h1>Finanzen sind magisch oder so</h1>

      

      {username && (
          <p>
            <button href="/" onClick={signOut}>SignOut</button>
          </p>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <p>
            <Link href="/enter">
              <button className="btn-blue">Log in</button>
            </Link>
          </p>
        )}
    </main>
  );
}