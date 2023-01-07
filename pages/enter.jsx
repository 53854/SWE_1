import Loader from "../components/Loader";
<<<<<<< HEAD:pages/enter.jsx
import { auth, firestore, googleAuthProvider } from "../lib/firebase";
import { useCallback, useContext, useEffect, useState, useMemo } from "react";

=======
import { auth, firestore, googleAuthProvider, serverTimestamp } from "../lib/firebase";
import { useCallback, useContext, useEffect, useState } from "react";
>>>>>>> 1d76df26984921d98d8ab71528c0793030cac170:pages/enter.js
import { UserContext } from "../lib/context";
import debounce from "lodash.debounce";

export default function Enter(props) {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

// Sign-In
// TODO: user info should be stored cold in props, and modified hot when needed.
// TODO: WE HAVE NO GDPR THINGYY
function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <>
      <button className="btn-google" onClick={signInWithGoogle}>
        <img src={"google.png"} alt="google" />
        Sign in with Google
      </button>
      <button onClick={() => auth.signInAnonymously()}>
        Sign in Anonymously
      </button>
    </>
  );
}

// Sign-Out
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  // Hit the database for username match after each debounced change
  // useCallBack is required for debounce to work
  const checkUsername = useMemo(
    () =>
      debounce(async (username) => {
        if (username.length >= 3) {
          const ref = firestore.doc(`usernames/${username}`);
          const { exists } = await ref.get();
          console.log("Firestore read executed!");
          setIsValid(!exists);
          setLoading(false);
        }
      }, 500),
    []
  );

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(formValue);
<<<<<<< HEAD:pages/enter.jsx
  }, [formValue, checkUsername]);

=======
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallBack is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log("Firestore read executed!");
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );
  
>>>>>>> 1d76df26984921d98d8ab71528c0793030cac170:pages/enter.js
  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both docs
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    // Commit both docs together as a batch write
    // TODO: Require new users to add fixed income and expenses

    const batch = firestore.batch();
    batch.set(userDoc, {
      username: formValue,
      user_id: user.uid,
      user_email: user.email,
      balance: 0,
      regular_income: 0,
      regular_expense: 0,
      member_since: serverTimestamp(),
      photoURL: user.photoURL,
      displayName: user.displayName,
      new_user: true,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };


  // TODO: if a user with an asssocated but outdated budget signs in, copy said budget and adjust for the current month
  return (
    !username && (
      <section>
        <h3>How should we call you?</h3>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            placeholder="username"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>
          <button href="/" onClick={() => auth.signOut()}>
            Sign Out without registration :C
          </button>

          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-succes">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}