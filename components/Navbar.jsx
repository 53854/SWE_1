import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth } from "../lib/firebase";

// Top navbar
export default function Navbar() {
  const { user, username } = useContext(UserContext)
  const router = useRouter();
  const signOut = () => {
    router.push("./");
    auth.signOut();
  }

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">HOME</button>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {username && (
          <>
            <li className='push-left'>
              <button href="/" onClick={signOut}>SignOut</button>
            </li>
            <li>
              <Link href="/admin">
                <button className="btn-blue">Create Expenses</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} />
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
    </nav>
  );
}