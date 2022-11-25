import Link from "next/link";

export default function ExpenseFeed({ expenses, admin }) {
  return expenses
    ? expenses.map((expense) => (
        <ExpenseItem expense={expense} key={expense.slug} admin={admin} />
      ))
    : null;
}

function ExpenseItem({ expense, admin = false }) {
  return (
    <div className="card">
      <Link href={`/${expense.username}/${expense.slug}`}>
        <h2>
         {expense.title}
        </h2>
      </Link>

      <footer>
        <span>{expense?.content}€</span>
      </footer>

      {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <Link href={`/admin/${expense.slug}`}>
            <h3>
              <button className="btn-blue">Edit</button>
            </h3>
          </Link>
        </>
      )}
    </div>
  );
}
