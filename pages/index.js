import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import BudgetFeed from '../components/BudgetFeed';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth, firestore, fromMillis, expenseToJSON } from '../lib/firebase'
import { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import Image from 'next/image'; 

export default function Home(props) {
  const { user, username } = useContext(UserContext)
  const router = useRouter();
  const signOut = () => {
    router.push("./");
    auth.signOut();
  }

  return (
    <>
      <main>
        {username && ( // ich hab hydration noch nicht komplett durchblickt bzw. was die fehlermeldung von mir wollen
       
          <div className="relative">
           <Image alt="" className="mx-auto z-10 pt-10" src="/essential.png" width={90} height={90}/>
           
          <div className="circle2"></div>
          <div className="circle3"></div>

           <div className="text-center z-10 text-xl font-thin pt-3 mr-2 tracking-tighter">€ 3.200</div>
           <div className="text-xs z-10 text-center text-neutral-300 pt-1 ml-auto">Budget Limit for</div>
           <div className="text-xs z-10 text-center leading-tight text-neutral-300 pt-1 ml-auto">Dec 2022</div>
           <BudgetPopup/>
           </div>

        

          
           // <BudgetFeed />
          
          
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
    </>

  );
}


function BudgetPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [rangeval, setRangeval] = useState(null);

  return (
    <>
      <Popup
            trigger={ <Image alt="" className="mx-auto pt-10 z-10" src="/add-6.png" width={60} height={60}/>
          }
        modal
        nested
      >
        {close => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>


            <div className="content">
              {' '}
              <Image alt="" className="saturate-0 hover-100 py-12 m-auto" onClick={() => setIsVisible(!isVisible)} style={{ display: !isVisible ? 'block' : 'none' }} src="/coin.png" width={90} height={90}/>





              <div style={{ display: isVisible ? 'block' : 'none' }}>
              <Image alt="" className="pt-8 mx-auto" src="/coin.png" width={90} height={90}/>
                <div className="text-center z-10  text-base font-thin mr-2 tracking-tighter">Savings</div>
                <div className="text-center text-xs pt-1 pb-8">percentage of your budget </div>
                <form>
                  
                  <input id="budget-range" type="range" className="budget-range" min="0" max="100"
                    onChange={(event) => setRangeval(event.target.value)} />
                  <strong className="mx-60 text-lg font-thin">{rangeval}%</strong>
                  <button className ="mx-auto py-6 animate-pulse" type="submit">
                    <Image alt="" className="" src="/checked.png" width={40} height={40}/>

                  </button>
            
                </form>

              </div>
            </div>
            <div className="actions">

            </div>
          </div>
        )}
      </Popup>
    </>
  );
}