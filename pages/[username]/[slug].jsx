import styles from '../../styles/Post.module.css';
import ExpenseContent from '../../components/ExpenseContent';
import { firestore, getUserWithUsername, expenseToJSON } from '../../lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import AuthCheck from '../../components/AuthCheck';
import Link from 'next/link';


export async function getStaticProps({ params }) {
    const { username, slug } = params;
    const userDoc = await getUserWithUsername(username);

    let expense;
    let path;

    if (userDoc) {
        const expenseRef = userDoc.ref.collection('expenses').doc(slug);
        expense = expenseToJSON(await expenseRef.get());

        path = expenseRef.path;
    }

    return {
        props: { expense, path },
        revalidate: 5000,
    };
}

export async function getStaticPaths() {
    // Improve my using Admin SDK to select empty docs
    const snapshot = await firestore.collectionGroup('expenses').get();
  
    const paths = snapshot.docs.map((doc) => {
      const { slug, username } = doc.data();
      return {
        params: { username, slug },
      };
    });
  
    return {
      // must be in this format:
      // paths: [
      //   { params: { username, slug }}
      // ],
      paths,
      fallback: 'blocking',
    };
  }

  export default function Expense(props) {
    const expenseRef = firestore.doc(props.path);
    const [realtimeExpense] = useDocumentData(expenseRef);
  
    const expense = realtimeExpense || props.expense;
  
    return (
      <main className={styles.container}>
  
        <section>
          <ExpenseContent expense={expense} />
        </section>
      </main>
    );
  }