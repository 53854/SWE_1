import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth, firestore, fromMillis, expenseToJSON} from '../lib/firebase'
import { useState, useEffect } from 'react';
import Image from 'next/image'; 


export default function Home(props) {
  const { user, username } = useContext(UserContext)
  const router = useRouter();
  const signOut = () => {
    router.push("./");
    auth.signOut();
  }

  return (   
    <main>


      

      {username && (
          <p>
            
           {/*<button href="/" onClick={signOut}>SignOut</button>*/} 
           <div class="relative">
           <Image class="mx-auto z-10 pt-10" src="/essential.png" width={90} height={90}/>
           
          <div className="circle2"></div>
          <div className="circle3"></div>

           <div class="text-center z-10 text-xl font-thin pt-3 mr-2 tracking-tighter">€ 3.200</div>
           <div class="text-xs z-10 text-center text-neutral-300 pt-1 ml-auto">Budget Limit for</div>
           <div class="text-xs z-10 text-center leading-tight text-neutral-300 pt-1 ml-auto">Dec 2022</div>

           </div>

            {/* Budget Limits*/}

            <div class="">
            <Image class="mx-auto pt-10 z-10" src="/add-6.png" width={60} height={60}/>
  
            </div>
          </p>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          
          <p>
              <h2>Landing Page Placeholder</h2>
              <h1>Finanzen sind magisch oder so</h1>
            <Link href="/enter">
              <button className="btn-blue">Log in</button>
            </Link>
          </p>
        )}
    </main>
  );
}