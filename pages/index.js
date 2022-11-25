import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { firestore, fromMillis, expenseToJSON} from '../lib/firebase'
import { useState, useEffect } from 'react';

export default function Home(props) {

  return (
    <main>
      <h1>Landing Page Placeholder</h1>
    </main>
  );
}