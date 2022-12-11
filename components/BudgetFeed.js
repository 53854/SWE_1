export default function UserProfile({ user }) {
    return (
        // hardcoded budget -> Anschluss and DB, pls don't hate me I am tired
        <div className="card">
            <label for="budget">Food & Drinks</label><br/>
            <label for="budget">€600 / month</label><br/>
            <meter id="budget" value="200" min="0" max="600"></meter><br/>
        </div>
    );
}