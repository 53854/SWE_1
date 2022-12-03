import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { firestore, fromMillis, expenseToJSON} from '../lib/firebase'
import { useState, useEffect } from 'react';

import Loader from '../components/Loader';
import ExpenseFeed from '../components/ExpenseFeed';


// Max post to query per page
const LIMIT = 10;

export async function getServerSideProps(context) {
  const expenseQuery = firestore
    .collectionGroup('expenses')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const expenses = (await expenseQuery.get()).docs.map(expenseToJSON);

  return {
    props: { expenses }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const [expenses, setExpenses] = useState(false);
  const [loading, setLoading] = useState(false);

  const [expensesEnd, setExpensesEnd] = useState(false);

  // Get next page in pagination query
  const getMoreExpenses = async () => {
    setLoading(true);
    const last = expenses[expenses.length - 1];

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;


    const query = firestore
      .collectionGroup('expenses')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newExpenses = (await query.get()).docs.map((doc) => doc.data());

    setExpenses(expenses.concat(newExpenses));
    setLoading(false);

    if (newExpenses.length < LIMIT) {
      setExpensesEnd(true);
    }
  }

  useEffect(() => {
    setExpenses(props.expenses);
  }, [props.expenses]);

  return (
    <main>
      <ExpenseFeed expenses={expenses} />

      {!loading && !expensesEnd && <button onClick={getMoreExpenses}>Load more</button>}

      <Loader show={loading} />

      {expensesEnd && 'You have reached the end!'}
    </main>
  );
}