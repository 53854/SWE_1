import UserProfile from '../../components/UserProfile';
import ExpenseFeed from '../../components/ExpenseFeed';
import { expenseToJSON, getUserWithUsername } from '../../lib/firebase';

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
            .where('published', '==', true)
            .orderBy('createdAt', 'desc')
            .limit(5);

        expenses = (await expensesQuery.get()).docs.map(expenseToJSON);
    }

    return {
        props: { user, expenses }, // will be passed to the page component as props
    };
}

export default function UserProfilePage({ user, expenses }) {
    return (
        <main>
            <UserProfile user={user} />
            <ExpenseFeed expenses={expenses} />
        </main>
    );
}