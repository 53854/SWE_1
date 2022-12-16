import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import Script from 'next/script'
import { auth, firestore, fromMillis, expenseToJSON} from '../lib/firebase'

import Image from 'next/image'; 
import { useState } from "react";
import Popup from 'reactjs-popup';

function BudgetPopup() {
  return(
    <Popup
    trigger={ <Image alt="" class="mx-auto pt-10 z-10" src="/add-6.png" width={60} height={60}/>
  }
    modal
    nested
    >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>

      <div class="btn">
        <button class="mx-auto p-5 rounded-full my-20 z-10 bg-[#2F2E2E] hover:bg-gradient-to-r from-[#A302ED] to-[#F00000] hover:scale-150 scale-100 active:animate-none transition duration-700 ease-in-out">
       <Image alt="" class="  saturate-0 hover:saturate-100" src="/coin.png" width={60} height={60}/>
       </button>
       </div>
    
       <div class="btn-particles">
  </div>
  
 
   

      </div>
    )}
  </Popup>
  );
}







export default function Home(props) {
  const { user, username } = useContext(UserContext)
  const router = useRouter();
  const signOut = () => {
    router.push("./");
    auth.signOut();
  }

  return (   
    <>
    <Head>
      <script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js' async></script>
      <script type='text/javascript' src='/public/button_particles.js' async></script>
    </Head>
    <main>


      

      {username && (
          <p>
            
           {/*<button href="/" onClick={signOut}>SignOut</button>*/} 
           <div class="relative">
           <Image alt="" class="mx-auto z-10 pt-10" src="/essential.png" width={90} height={90}/>
           
          <div className="circle2"></div>
          <div className="circle3"></div>

           <div class="text-center z-10 text-xl font-thin pt-3 mr-2 tracking-tighter">€ 3.200</div>
           <div class="text-xs z-10 text-center text-neutral-300 pt-1 ml-auto">Budget Limit for</div>
           <div class="text-xs z-10 text-center leading-tight text-neutral-300 pt-1 ml-auto">Dec 2022</div>
           <BudgetPopup/>
           </div>

            {/* Budget Limits*/}

            <div class="">
  
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
    </>
  );
}