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
          <div>
            Budget Limits
            <BudgetFeed />
            <BudgetPopup />
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
    </>

  );
}

// TODO: Remove new user flag from userdoc after setting new budget
// TODO: Create corrosponding document in budgets collection
function BudgetPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [rangeval, setRangeval] = useState(null);


  // TODO: This should be associated with new user registration or adding / modifying a budget
  // TODO: Suggestion to capsue this into a component
  return (
    <>
      <Popup
        trigger={<button className="button"> Add Budget </button>}
        modal
        nested
      >
        {close => (
          <div className="modal">
            <button className="close" onClick={close}>
              &times;
            </button>
            <div className="header"> Budget </div>
            <div className="content">
              {' '}
              <button onClick={() => setIsVisible(!isVisible)} style={{ display: !isVisible ? 'block' : 'none' }}>Savings?</button>

              <div style={{ display: isVisible ? 'block' : 'none' }}>
                <h2>Savings</h2>
                <form>
                  <input id="budget-range" type="range" className="budget-range" min="0" max="100"
                    onChange={(event) => setRangeval(event.target.value)} />
                  <strong>{rangeval}%</strong>

                  <button type="submit" className="btn-green">
                    Create New Budget
                  </button>
                </form>

              </div>
            </div>
            <div className="actions">
              <button
                className="button"
                onClick={() => {
                  close();
                  setIsVisible(false);
                }}
              >
                Close Popup
              </button>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
}