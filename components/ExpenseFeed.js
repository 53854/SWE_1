import Link from "next/link";

export default function ExpenseFeed({ expenses, admin }) {
  
  return expenses
    ? expenses.map((expense) => (
        <ExpenseItem expense={expense} key={expense.slug} admin={admin} />
      ))
    : null;
}

function ExpenseItem({ expense, admin = false }) {
  const createdAt = typeof expense?.createdAt === 'number' ? new Date(expense.createdAt) : expense.createdAt.toDate();

  return (

    

    
    <div className="flex flex-row justify-start p-2 font-thin">
      <div className="circle"></div>
      <div className="">
      <Link href={`/${expense.username}/${expense.slug}`}>
        <h2 className="pt-1 text-base">
         <span>{expense.title}</span>
        </h2>
      </Link>

      <div className="self-end text-sm text-neutral-300 pt-1"> Category </div>
      </div>

      <footer className="pt-1 text-base ml-auto">
        <span className="ml-auto">{expense?.content}€</span>
        <div className="text-xs text-neutral-300 pt-1 ml-auto">
        {createdAt.toLocaleDateString()}
        </div>

        


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
