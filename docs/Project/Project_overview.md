# **Software Engineering** - WiSe 2022/23

This Document roughly outlines the project structure and requirements.

## **Team Roles**

Unanimously agreed upon roles for the team members:

| **Role**          | **Team Member** |
| :---------------- | --------------: |
| **Product Owner** |         @Dennis |
| **Scrum Master**  |      @Sebastian |
| **Developer**     |           @Niko |
| **Designer**      |           @Eddy |

These merely describe the roles of the team members, but do not necessarily reflect the actual workload of each team member, which is intended to end up roughly equal.

We're working in a somewhat soft-scrum environment, for which our Planning and kanban board are located in this [GitHub Project](https://github.com/users/53854/projects/5)

## **Project requirements**

The project is intended to be developed and documented by a team of 4 students, displaying core concepts of the Software Engineering Process.  
These include but are not limited to:

1. Requirements Engineering (Collecting customer stories to define core features or similar)
2. Software Architecture (Utilizing UML Diagrams and other tools to define the structure of the software)
3. Software Design (Planning the development process based on established operational frameworks)
4. Software Development (Implementing the software based on the principle of test driven development and established design patterns)

### **App requirements**

- application responds quickly
- application is easy to use
- available on multiple platforms
- Users can track their expenses
  - add, modify and delete expenses and income
  - define periodicity of recurring expenses and income
  - list of all expenses
  - weekly / monthly / ... overview of expenses | summary
  - categorization / tagging / filtering

## **Tool Stack**

Tools we decided to use for development of the application

| **Purpose**            |   **Tool** |                                                        **Link** |                                **Notes** |
| :--------------------- | ---------: | --------------------------------------------------------------: | ---------------------------------------: |
| **Versioning**         |     Github |                     [This Repo](https://github.com/53854/SWE_1) |                                          |
| **Hosting**            |     vercel |                                   [Vercel](https://vercel.com/) | vercel integrates seamlessly with nextjs |
| **Database**           |   Firebase |                 [Google Firebase](https://firebase.google.com/) |                          using firestore |
| **Runtime**            |       Node |                                [Nodejs](https://nodejs.org/en/) |                  bun isn't stable enough |
| **Auth**               |   Firebase |               [Firebase](https://firebase.google.com/docs/auth) |                                          |
| **Framework**          |    Next.js |                             [Tailwind.css](https://nextjs.org/) |                                          |
| **CSS**                |   Tailwind |                                [Link](https://tailwindcss.com/) |                      potentially changed |
| **Containers**         | Codespaces |                                             used within githiub |                                          |
| **Design**             |      Figma |                                                     linktofigma |                                          |
| **Project Management** |    Trello? | [Trello](https://trello.com/b/1Z7Z7Z7Zsoftware-engineering-101) |                         Github Projects? |
| **Communication**      |    Discord |                                                         private |                                          |

## **Data Model**

As we're using Firebase, our database requires to store data in JSON Style, non relational datascheme.
The following is a rough outline of how we use redundancy in septate collections in order to optimize for efficiency and therefore scale:

### Users collection

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

### Transactions collection

```json
{
  "TRANSACTION_ID": {
    "amount": 100.5,
    "id": "12h3k21h3j12h31kj",
    "description": "Grocery shopping",
    "date": "2022-12-22T12:34:56.789Z",
    "type": "expense",
    "user": "users/<USER_ID>",
    "category": "categories/<CATEGORY_ID>",
    "budget": "budgets/<BUDGET_ID>",
    "recurrence": "monthly",
    "next_occurrence": "2022-01-22T12:34:56.789Z"
  }
}
```

### Categories collection

```json
{
  "CATEGORY_ID": {
    "name": "Groceries",
    "id": "12h3k21h3j12h31kj",
    "description": "Expenses related to grocery shopping",
    "user": "users/<USER_ID>"
  }
}
```

### Budgets collection

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
