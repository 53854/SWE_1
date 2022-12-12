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
            data={[{ value: budgetLeft, color: 'rgba(185,56,217,0.7931547619047619)' }]}

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
                fontSize:'0.35px',
                fontFamily: 'Helvetica',
                letterSpacing: '0.00000001px',
                fontWeight: '100',
                fill: '#FFFFFF',
            }}
            labelPosition={0}
        />
    )
}


export default function UserProfilePage({ user, expenses }) {
    return (
        <main>
            <div class="flex-col">
            <div>
            <UserProfile user={user} />
            </div>

            <div class="pt-14">
                <SummaryChart expenses={expenses} />
                <div class="text-center tracking-tight text-base pt-4 pb-10 font-thin">Budget left</div>
            </div>

            <div>
            <ExpenseFeed expenses={expenses} />
            </div>
            </div>
        </main>
    );
}