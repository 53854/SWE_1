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


    
    <div className="flex flex-row justify-start p-3">
      <div class="circle"></div>
      <div class="">
      <Link href={`/${expense.username}/${expense.slug}`}>
        <h2 class="pt-1">
         <span>{expense.title}</span>
        </h2>
      </Link>

      <div class="self-end text-xs pt-1"> Category </div>
      </div>

      <footer class="ml-auto pt-1 text-xl">
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

          {expense.published ? (
            <p className="text-success">Live</p>
          ) : (
            <p className="text-danger">Unpublished</p>
          )}
        </>
      )}
    </div>
  );
}
