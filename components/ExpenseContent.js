import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

// UI component for main expense content
export default function ExpenseContent({ expense }) {
  const createdAt = typeof expense?.createdAt === 'number' ? new Date(expense.createdAt) : expense.createdAt.toDate();

  return (
    <div className="card">
      <h1>{expense?.title}</h1>
      <span className="text-sm">
        Created on {createdAt.toISOString()}
      </span>
      <br></br>
      <br></br>
      {expense?.content}€
    </div>
  );
}