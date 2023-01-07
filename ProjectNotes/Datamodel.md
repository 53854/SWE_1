# NoSQL Data model for personal accounting

## Structure Data and track reoccurring transactions

Reoccurring transactions should be traced and predicted.
With our current data model using the transaction name as key this is not possible.

Further, with the current model it is hard to maintain consistency in tags and fields

## Findings when adapting a more scalable data model

### Reoccurring transactions

Reoccurring transactions require cloud functions in order to automatically be added to the users account, otherwise they can solely be used for predictive purposes and will still require manual adding at every reoccurrence.

### Income and expenses

Income and expenses can

## Data Model

As we're using Firebase, our database requires storing data in JSON Style, non-relational data scheme.

### Using collections

In a non-relational database, we can use collections to store data in a more normalized way, but we have to be careful to not overuse this feature, as it will increase the amount of reads and writes to the database.
The following is a rough outline of how we use redundancy in separate collections in order to optimize for efficiency and scale by avoiding sub-collections:

#### **Users collection**

Users is the main or "master" collection, keeping track of all registered users and their data.
It includes, amongst other, the total sum of a user recurring income and fixed expenses, as well as a reference to their currently selected budget.

```json
{
  "USER_ID": {
    "name": "John Smith",
    "uid": "12h3k21h3j12h31kj",
    "email": "john@example.com",
    "current_budget": "budgets/<BUDGET_ID>",
    "balance": 1000.0,
    "regular_income": 1000.0,
    "regular_expense": 0.0,
    "member_since": "2022-12-22T12:34:56.789Z"
  }
}
```

#### **Transactions collection**

Transactions are stored by a unique ID, which is also used as the key in the collection.
Users access their transactions by referencing their user ID in the user collection.
Similarly, the transaction is also reflected on the budget currently active by the user in order to keep track of the current amount of the budget.

They can further be categorized by referring to the category ID in the category collection, which will then supply further information about the transaction. In the future maybe more than once category can be assigned to a transaction. 

Recurring transactions are stored in the same collection, but with a reference to the next occurrence of the transaction which is only set if the recurrence is set to true.

```json
{
  "TRANSACTION_ID": {
    "name": "Rewe Koslowsky 31231",
    "amount": 100.5,
    "id": "12h3k21h3j12h31kj",
    "description": "Grocery shopping",
    "date": "2022-12-22T12:34:56.789Z",
    "is_expense": true,
    "user": "users/<USER_ID>",
    "category": "categories/<CATEGORY_ID>",
    "budget": "budgets/<BUDGET_ID>",
    "recurrence": true,
    "next_occurrence": "2022-01-22T12:34:56.789Z"
  }
}
```

#### **Categories collection**

Categories are generally available for all users, unless the "users" array field is set / non-empty.

```json
{
  "CATEGORY_ID": {
    "name": "Groceries",
    "id": "12h3k21h3j12h31kj",
    "description": "Expenses related to grocery shopping",
    "users": ["users/<USER_ID>", "users/<USER_ID>"]
  }
}
```

#### **Budgets collection**

```json
{
  "BUDGET_ID": {
    "name": "Monthly budget",
    "amount": 1000,
    "start_date": "2022-12-01",
    "end_date": "2022-12-31",
    "user": "users/<USER_ID>",
    "current_amount": 500
  }
}
```

## Discussion SupaBase Firebase

Increase code complexity and rewrite / refactor a large part of the application in favor of going relational db and open source?

### \[DEPRECATED\]Classic relational database

Usually we would use a relational database to store data in a normalized way, but as we're using Firebase, we're forced to use a non-relational database.
In a relational database, our data could look like this:

- #### **Users table**

| name         | UID                 | email              | current_budget        | balance | regular_income | regular_expense | member_since               |
| ------------ | ------------------- | ------------------ | --------------------- | ------- | -------------- | --------------- | -------------------------- |
| "John Smith" | "12h3k21h3j12h31kj" | "john@example.com" | "budgets/<BUDGET_ID>" | 1000.0  | 1000.0         | 0.0             | "2022-12-22T12:34:56.789Z" |

- #### **Transactions table**

| amount | ID                  | description        | date                       | type      | user              | category                   | budget                | recurrence | next_occurrence            |
| ------ | ------------------- | ------------------ | -------------------------- | --------- | ----------------- | -------------------------- | --------------------- | ---------- | -------------------------- |
| 100.5  | "12h3k21h3j12h31kj" | "Grocery shopping" | "2022-12-22T12:34:56.789Z" | "expense" | "users/<USER_ID>" | "categories/<CATEGORY_ID>" | "budgets/<BUDGET_ID>" | "monthly"  | "2022-01-22T12:34:56.789Z" |

- #### **Categories table**

| name        | ID                  | description                            | user              |
| ----------- | ------------------- | -------------------------------------- | ----------------- |
| "Groceries" | "12h3k21h3j12h31kj" | "Expenses related to grocery shopping" | "users/<USER_ID>" |

- #### **Budgets table**

| name             | amount | start_date   | end_date     | user              | current_amount |
| ---------------- | ------ | ------------ | ------------ | ----------------- | -------------- |
| "Monthly budget" | 1000   | "2022-12-01" | "2022-12-31" | "users/<USER_ID>" | 500            |
