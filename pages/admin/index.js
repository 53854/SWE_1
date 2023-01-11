import styles from "../../styles/Admin.module.css";
import AuthCheck from "../../components/AuthCheck";
import ExpenseFeed from "../../components/ExpenseFeed";
import { UserContext } from "../../lib/context";
import { firestore, auth, serverTimestamp } from "../../lib/firebase";

import { useContext, useState } from "react";
import { useRouter } from "next/router";

import { useCollection } from "react-firebase-hooks/firestore";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";

function ExpenseList() {
  const ref = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("expenses");
  const queryMonthly = ref.where("monthly", "==", true);
  const queryOneTime = ref.where("monthly", "==", false);
  //const query = ref.orderBy('createdAt');
  const [querySnapshotMonthly] = useCollection(queryMonthly);
  const [querySnapshotOneTime] = useCollection(queryOneTime);

  const expensesMonthly = querySnapshotMonthly?.docs.map((doc) => doc.data());
  const expensesOneTime = querySnapshotOneTime?.docs.map((doc) => doc.data());

  return (
    <>
      <h1>Manage your expenses</h1>
      <h2>Monthly Expenses</h2>
      <ExpenseFeed expenses={expensesMonthly} admin />
      <h2>One-Time Expenses</h2>
      <ExpenseFeed expenses={expensesOneTime} admin />
    </>
  );
}

// TODO: Either we have to rewrite a lrage part of this or clean this one up
// TODO: New users should recieve a "frist budget screen" forcing them to enter at least one fixed expense and income
// TODO: Non new users should auto link to their currently selected budget
// TODO: if the recurring flag is ture, fixed income and expense should be adjusted
// TODO: Fetch list of available catories -> categories with the "users" field being empty or containing the current user
function CreateNewExpense() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [name, setTitle] = useState("");

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(name));

  // Validate length
  const isValid = name.length > 3 && name.length < 100;

  // Create a new post in firestore
  const createExpense = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection("users")
      .doc(uid)
      .collection("expenses")
      .doc(slug);

    // Tip: give all fields a default value here
    const data = {
      title: name,
      slug,
      uid,
      username,
      content: 0,
      monthly: false,
      published: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await ref.set(data);

    toast.success("Expense created!");

    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createExpense}>
      <input
        value={name}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Type the purpose of your expense here"
        className={styles.input}
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className="btn-green">
        Create New Expense
      </button>
    </form>
  );
}

export default function AdminExpensePage(props) {

  if (auth.currentUser == null) {
    return (
      <main>
        <h1>You must be signed in to view this page.</h1>
      </main>
    );
  }

  return (
    <main>
      <AuthCheck>
        <CreateNewExpense />
        <ExpenseList />
      </AuthCheck>
    </main>
  );
}
