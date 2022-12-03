import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

// UI component for main expense content
export default function ExpenseContent({ expense }) {
  /**
   * Component for showing the deatils of an expense
   * 
   * @component ExpenseContent
   *
   * @param {object} expense - The expense object
   * 
   * @returns {JSX.Element} - The JSX for the component
   * 
   * @example
   * const expense = {
   *  id: 1,
   * title: 'Expense 1',
   * description: 'This is the description for expense 1',
   * amount: 100,
   * date: '2020-01-01',
   * category: 'Food',
   * };
   * return <ExpenseContent expense={expense} />
   * 
   */
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