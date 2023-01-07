# Notes and Todos for the final presentation

A summary of all important information, still required changes and other annotation before the final presentation.

## **Notes**

Notes for the presentation and the resulting report.
### Diagrams

Please collect and validate all diagrams used during the presentation, amongst which should be some elaborating on the requirements / use case as well as the architecture of the application.

#### Requirements related diagrams list
 - [ ] **Use Case Diagram** (Dennis)
 - [ ] ...

#### Application architecture diagrams list
 - [ ] **Component Diagram** (Dennis)
 - [ ] ...

### Patterns
YES WE HAVE MCV - BUT BASICALLY EVERY GUI APP DOES
Given that our codebase *works*, but the same way monkeys *work* on crack, we should consider refactoring our codebase to use the following patterns:

 - [ ] **Factory Pattern** for the creation of new transactions and other reused components, which is partly implemented but not clearly used and separated
 - [ ] **Observer Pattern** there should be a budgeting component, which listens to new transactions and updates the budget accordingly
 - [ ] **DAO Pattern**  for the database access, which is currently implemented in a very hacky way, we should write a clear DAO class, which ad hoc db access and provides a clean interface for the rest of the codebase
 - [ ] **Command Pattern** for the undo/redo functionality, we could write a clear Command class, which encapsulates the undo/redo functionality and potentially other functionality
 - [ ] **Singleton Pattern** We are making sure by default only **one** user is logged in and only one budget is active at a time, we could use a singleton pattern more clearly to further ensure this

### Data Model and Architecture

See the [Data Model document](Datamodel.md) for a detailed description of the data model.

A write up for the architecture of the application should be added to the [Architecture document](Architecture.md).

### Test, CI and documentation

 - [] **OH FUCK WE FORGOT ABOUT DOCUMENTATION** I will take care of this asap (Seb)
 - [] **Test** We currenlty use vercel to deploy our application, and test every build and preview for successful builds and linting errors upon pushes to master
 - [] **CI** We currenlty use github actions to run our tests and call deploy to vercel (out hosting partner)

### Automization

See above

## TODOs 

**WE ARE MISSIGN A GDPR THINGYY**

Here i would like to summarize TODOS in correspondence to our milestones and scrum board, as well as last minute fixed or direct feedback to the codebase / presentation

