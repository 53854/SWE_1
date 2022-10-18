import styles from '../../styles/Admin.module.css';
import AuthCheck from '../../components/AuthCheck';
import { firestore, auth, serverTimestamp } from '../../lib/firebase';

import { useState } from 'react';
import { useRouter } from 'next/router';

import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function AdminExpenseEdit(props) {
    return (
        <AuthCheck>
            <ExpenseManager />
        </AuthCheck>
    );
}

function ExpenseManager() {
    const [preview, setPreview] = useState(false);
  
    const router = useRouter();
    const { slug } = router.query;
  
    const expenseRef = firestore.collection('users').doc(auth.currentUser.uid).collection('expenses').doc(slug);
    const [expense] = useDocumentData(expenseRef);
  
    return (
      <main className={styles.container}>
        {expense && (
          <>
            <section>
              <h1>{expense.title}</h1>
              <p>ID: {expense.slug}</p>
  
              <ExpenseForm expenseRef={expenseRef} defaultValues={expense} preview={preview} />
            </section>
  
            <aside>
            <h3>Tools</h3>
              <button onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
              <Link href={`/${expense.username}/${expense.slug}`}>
                <button className="btn-blue">Live view</button>
              </Link>
              <DeleteExpenseButton expenseRef={expenseRef} />
            </aside>
          </>
        )}
      </main>
    );
}

function ExpenseForm({ defaultValues, expenseRef, preview }) {
    const { 
      register, 
      handleSubmit, 
      reset, 
      watch, 
      formState, 
      errors 
    } = useForm({ defaultValues, mode: 'onChange' });

    const { isValid, isDirty } = formState;

  
    const updateExpense = async ({ content, monthly, published }) => {
      await expenseRef.update({
        content,     
        monthly,
        published,
        updatedAt: serverTimestamp(),
      });
  
      reset({ content, monthly, published });
  
      toast.success('Expense updated successfully!')
    };
  
    return (
      <form onSubmit={handleSubmit(updateExpense)}>
        {preview && (
          <div className="card">
            {watch('content')}
          </div>
        )}

        <div className={preview ? styles.hidden : styles.controls}>

            <label>Expense Value in €</label>
            <input type="number" id="content" name="content" step="0.01" ref={register} /> 
          

          {errors.content && <p className="text-danger">{errors.content.message}</p>}
  
          <fieldset>
            <input className={styles.checkbox} name="monthly" type="checkbox" ref={register} />
            <label>Monthly</label>
            <br></br>
            <input className={styles.checkbox} name="published" type="checkbox" ref={register} />
            <label>Published</label>
          </fieldset>
  
          <button type="submit" className="btn-green">
            Save Changes
          </button>
        </div>
      </form>
    );
  }


  function DeleteExpenseButton({ expenseRef }) {
    const router = useRouter();
  
    const deleteExpense = async () => {
      const doIt = confirm('Are you sure?');
      if (doIt) {
        await expenseRef.delete();
        router.push('/admin');
        toast('Expense annihilated ', { icon: '🗑️' });
      }
    };
  
    return (
      <button className="btn-red" onClick={deleteExpense}>
        Delete
      </button>
    );
  }