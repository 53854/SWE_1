import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth } from "../lib/firebase";
import Image from 'next/image'; 




// Top navbar
export default function Navbar() {
  const { user, username } = useContext(UserContext)
  const router = useRouter();
  const signOut = () => {
    router.push("./");
    auth.signOut();
  }

  return (



    <div class="block absolute inset-x-0 bottom-0 h-32 bg-gradient-to-bl from-[#1F1F1F] via-[#1F1F1F] to-[#b938d958]">
      <ul class="flex flex-row justify-between static mt-6">
      
        <li class="flex px-12 py-1 ">
          <Link href="/">
            <Image src="/home-2.png" width={90} height={90}/>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {username && (
          <>
          {/*
            <li class="flex">
              <button href="/" onClick={signOut}>SignOut</button>
            </li>
        */}

            <li class="flex py-1">
              <Link href="/admin">
             {/* <span class="material-symbols-outlined">add_circle</span> */}
              <Image src="/add-6.png" width={90} height={90}/>
              
              
              </Link>
            </li>
            <li class="flex px-12 py-1">
              <Link href={`/${username}`}>
              <Image src="/application.png" width={90} height={90}/>
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <li>
            {/*
            <Link href="/enter">
              <button className="btn-blue">Log in</button>
            </Link>
        */}
          </li>
        )}
      </ul>
      </div>

  );
}