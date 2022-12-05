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

    <><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,200,0,0" /><nav className="fixed h-32 w-full inset-x-0 bottom-0">



      <ul class="flex flex-row justify-between py-2 bg-[#1F1F1F]">
      
        <li class="flex px-16 py-2">
          <Link href="/">
            <Image src="/home-2.png" width={50} height={50}/>
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

            <li class="flex">
              <Link href="/admin">
             {/* <span class="material-symbols-outlined">add_circle</span> */}
              <Image src="/add-6.png" width={70} height={70}/>
              
              
              </Link>
            </li>
            <li class="flex px-16 py-2">
              <Link href={`/${username}`}>
              <Image src="/application.png" width={50} height={50}/>
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav></>
  );
}