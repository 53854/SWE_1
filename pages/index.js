import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import BudgetFeed from '../components/BudgetFeed';
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
      
      {username && ( // ich hab hydration noch nicht komplett durchblickt bzw. was die fehlermeldung von mir wollen
          <div>
            
            Budget Limits
            <BudgetFeed />
          </div>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <div>
            Landing Page Placeholder
            Finanzen sind magisch oder so
            <Link href="/enter">
              <button className="btn-blue">Log in</button>
            </Link>
          </div>
        )}
    </main>
  );
}