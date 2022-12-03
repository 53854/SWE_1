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

function SummaryChart() {

    return (
        <PieChart
            data={[{ value: 1254, color: '#3B49DF' }]}
            viewBoxSize={[4, 2]}
            center={[2, 1]}
            radius={0.8}
            lengthAngle={-360}
            rounded={true}
            animate={true}
            totalValue={1500}
            lineWidth={20}
            label={({ dataEntry }) => dataEntry.value + "€"}
            labelStyle={{
                fontSize:'0.35px',
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
            <SummaryChart />
            <ExpenseFeed expenses={expenses} />
        </main>
    );
}