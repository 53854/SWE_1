import UserProfile from '../../components/UserProfile';
import ExpenseFeed from '../../components/ExpenseFeed';
import { expenseToJSON, getUserWithUsername } from '../../lib/firebase';
import { PieChart } from 'react-minimal-pie-chart';

export async function getServerSideProps({ query }) {
    const { username } = query;

    const userDoc = await getUserWithUsername(username);

    // if no user, short circuit to 404 page
    if (!userDoc) {
        return {
            notFound: true,
        };
    }

    // JSON serializable data
    let user = null;
    let expenses = null;

    if (userDoc) {
        user = userDoc.data();
        const expensesQuery = userDoc.ref
            .collection('expenses')
            .orderBy('createdAt', 'desc')
            /* .limit(5) */;

        expenses = (await expensesQuery.get()).docs.map(expenseToJSON);
    }

    return {        
        props: { user, expenses }, // will be passed to the page component as props
    };
}

function SummaryChart({ expenses }) {
    let expenseValue = 0;
    let budget = 1500;

    for (let i = 0; i < expenses.length; i++) {
        const element = Number(expenses[i].content);
        expenseValue += element;     
    }

    let budgetLeft = Math.round((budget - expenseValue) * 100) / 100;

    return (
        <PieChart
            data={[{ value: budgetLeft, color: '#3B49DF' }]}
            viewBoxSize={[5, 2.5]}
            center={[2.5, 1.25]}
            background="#b5bdc4"
            radius={1.25}
            startAngle={105}
            lengthAngle={330}
            rounded={true}
            animate={true}
            animationDuration={750}
            totalValue={budget}
            lineWidth={20}
            label={({ dataEntry }) => dataEntry.value + "€"}
            labelStyle={{
                fontSize:'0.4px',
                fontFamily: 'Noto Sans',
                fill: '#3B49DF',
            }}
            labelPosition={0}
        />
    )
}

export default function UserProfilePage({ user, expenses }) {
    return (
        <main>
            <UserProfile user={user} />
            <SummaryChart expenses={expenses} />
            <ExpenseFeed expenses={expenses} />
        </main>
    );
}