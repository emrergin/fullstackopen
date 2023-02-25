# fullstackopen

Homeworks and Assignments for [Full Stack open 2022](https://fullstackopen.com/en).

## Part 0 Fundamentals of Web apps
The task for this part required preparing some diagrams to summarize the response and request chain between the browser and the server.

- [Course](https://fullstackopen.com/en/part0)
- [My solutions](https://github.com/emrergin/fullstackopen/tree/main/part0)

## Part 1 Introduction to React
The task for this part required me to make 3 different React Apps, one course listing, one customer voting and one random anecdote website. Event handlers and multiple components are covered.

- [Course](https://fullstackopen.com/en/part1)
- [My solutions](https://github.com/emrergin/fullstackopen/tree/main/part1)

### What I learned in Part 1
- Anecdotes is the first project in which I used `Uint8Array`.
- Object and Array mutations need extra care under state events.

## Part 2 Communicating with server
The task for this part required me to polish the courseinfo app from earlier. Furthermore, I also made a phonebook with data save and a search field.

- [Course](https://fullstackopen.com/en/part2)
- [My solutions](https://github.com/emrergin/fullstackopen/tree/main/part2)

### What I learned in Part 2
- I had used `reduce` before, but this is the first time I fully understood its versatility.
- I finally grasped the use of using functions as paramters or props, which is really helpful when working with components that includes event handlers.
- When rendering a list, `map` needs a wrapping `div` or a `Fragment`.
- Never call a component from itself, recursive components are never a good idea :)
- I learned that childs deleting themselves is an anti-pattern in react. Changing the state via the parent is the way to go.
- I learned more about REST principles which will probably be introduced more deeply in the next sessions.

## Part 3 Programming a server with NodeJS and Express
The task for this part expects to build a fullstack webpage, connected to the frontend built in the previous parts. Since it is deployed to the heroku at the end, it needed a separate repo, given below:

- [Course](https://fullstackopen.com/en/part3)
- [My solutions](https://github.com/emrergin/fullstackopen_phonebook)
- [Live](https://obscure-oasis-12065.herokuapp.com/)

### What I learned in Part 3
- Note that I already have some experience with Express, which can be seen [here](https://github.com/emrergin/atolye).
- I learned how to use the Visual Studio [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension, which for some reason, I liked more than the [Postman](https://www.postman.com/).
- I knew that express files can serve premade html files, but I did not consider to use this opportunity with frameworks before this.
- I knew about middleware, but did not know the routes can also be used as such given, `next` parameters for error handling.

## Part 4 Testing Express servers, user administration
This part is about Jest, a testing Library for Javascript. We also started to write a Blog app.
- [Course](https://fullstackopen.com/en/part4)
- [My solutions](https://github.com/emrergin/fullstackopen/tree/main/part4)
### What I learned in Part 4
- Thanks to the curriculum of the [Odin Project](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript#testing-javascript) I was not a total newbie when it comes to testing. However we all know that more testing never kills anyone.
- This is the first time I wrote tests for a backend project.
- This is the first time I wrote tests for async operations.
- This is the first time I wrote integration tests.
- This is the first time I implemented *JWT*, I had used *PassportJS* before.
- This is the first time I wrote tests for authenticated actions.
- Again, not the first time I used middleware, but I feel way more comfortable with them than before.
- `{...someObject,likes: 99} ` and `{likes: 99,...someObject}` are two different objects.
- I learned what *Redis* is generally used for.

## Part 5 Testing React apps
This part was about unit tests for the frontend and E2E tests. We wrote the frontend for the blog list app whose backend that we wrote in the previous part.
- [Course](https://fullstackopen.com/en/part5)
- [My solutions](https://github.com/emrergin/fullstackopen/tree/main/part5)
### What I learned in Part 5
- I learned what `props.child` is and how can it be used.
- This is my first time using `useRef`,`forwardRef` and `useImperativeHandle`.
- This is the first time I am writing for components.
- This is the first time I am emulating user input for testing.
- I had to learn how to [isolate tests](https://kentcdodds.com/blog/test-isolation-with-react) with *React*.
- I learned how to use [Cypress](https://www.cypress.io/) and done my first *E2E testing*.
- I learned different node environments and how they are used.
- I learned to stop worrying and love to write testing.

## Part 6 State management with Redux
This part is all about Redux. The exercises requested introducing Redux to [unicafe](https://github.com/emrergin/fullstackopen/tree/main/part1/unicafe) and [anecdotes] projects from [Part1](https://github.com/emrergin/fullstackopen/tree/main/part1).
- [Course](https://fullstackopen.com/en/part6)
- [My solutions](https://github.com/emrergin/fullstackopen/tree/main/part6)
### What I learned in Part 6
- This is the first time I am using a state-management library. While I am better versed in **Vue**, even in that, I did not need complex state-management, so I have not used *Vuex* or *Pinia* before.
- I learned how bulky Redux can feel, especially for small projects.
- I used Redux Toolkit for the first time.
- I learned to use hooks such as `useSelector` and `useDispatch` to access the store.
- I also learned to use `connect` function to replicate the same functionality.
- I learned what Presentational and Container components are.

## Part 7 React router, custom hooks, styling app with CSS and webpack

Main bulk of this part was about improving the Bloglist Frontend we made in *Part 5*. The exercises were detached from the reading material to an extent.

- [Course](https://fullstackopen.com/en/part7)
- [My solutions](https://github.com/emrergin/fullstackopen/tree/main/part7)

### What I learned in Part 7
- Note that, this part required modifications rather than writing from scratch, so some of the code included is not mine.
- I learned how to use `useNavigation` and `useParams` hooks.
- I learned some functionality of the Routers can only be used outside of a component.
- I used parametrized routing.
- I wrote my first custom hook.
- I learned about some useful React libraries, like: [formik](https://www.npmjs.com/package/formik) and [recharts](https://recharts.org/en-US/).
- I did a lot of refactoring, while adding new features to both the backend and to the frontend for an existing codebase.
- I used my first component libraries with React, namely [react-bootstrap](https://react-bootstrap.github.io/) and [styled-components](https://styled-components.com/).

## Part 8 GraphQL
This part requires me to write GraphQL queries for a library website, and covered the implementation of GraphQL for both the frontend and the backend.

- [Course](https://fullstackopen.com/en/part8)
- [My solutions](https://github.com/emrergin/fullstackopen/tree/main/part8)

### What I learned in Part 8
- I have not tried **GraphQL** before, so this is definitely an informative experience.
- By extension of the above, this is also my first time using the **Apollo** client, server and explorer.
- I learned how to use *mutations* and *queries* with optional variables.
- I learned about importance of cleaning the cache and the local storage.
- This is the first time I used **Web Sockets**, is not that amazing?
- I learned about the **n+1 problem** and how sinister it can be. I also solved it in the current application.
- I learned that, *apollo cache* is saved separately not only for each query, but also the variables sent. If manual updates are used, any cache whose query can take variables should be updated separately for all related variables.

## Part 9 TypeScript

This part focuses on typing both Express and React apps.

- [Course](https://fullstackopen.com/en/part9)
- [My solutions](https://github.com/emrergin/fullstackopen/tree/main/part9)

### What I learned in Part 9
- I learned how to use `require.main` to skip the global scope for the functions I am exporting.
- I learned that calling a function from command line, starts the numbering of the alternatives from 2.
- I learned how **generics** can be used to define stricter types (such as positive integers), with the help of **template literal types**.
- I learned that type unknown is used for errors.
- I learned the only acceptable use case for any is for user input.
- I learned that TypeScript can't do math, so `declare var a : -1 | 0 | 1; a = -a;` gives error. For that, we have **type assertion** which can be used with `as` keyword.
- When calling scripts from command line, config can be written as: `npm run script -- --option`.
- I learned why do we need **type casting**, and how does it work.
- I learned how to use `enum`s.
- I learned that to be able to check whether something is a string, checking `typeof` is not enough.
- I created my first **union type**.
- I used **exhaustive type checking** for the first time.
- I used **Context API** and **useReducer** for the first time.
- This is the first time that I am using **Material UI**.
- While the Part 7 mentioned **Formik** as a great library, this is my first time actually using it.
- I learned about `extend`, `&` and `Partial`.
- I learned that TypeScript engine is not always smarter than me.

## Part 13 Relational Databases

This part focuses on **PostgreSQL** using **Sequelize ORM**. The task is mostly about replicating the backend written in *Part 4* with Postgres this time. The actual task suggested the use of postgres features of either Fly.io or Heroku, but I decided to locally install postgres instead.

- [Course](https://fullstackopen.com/en/part13)
- [My solutions](https://github.com/emrergin/fullstackopen/tree/main/part13)

### What I learned in Part 13
- My first deep dive in SQL. Before this, I also worked on another tutorial series about Postgres by **Amigoscode** which can be found here: https://www.youtube.com/watch?v=5hzZtqCNQKk
- Express apps need to activate `json()` middleware for parsing request bodies. I somehow forgot about this...
- Express error handler middleware should be used after the routes, not before.
- Thanks to my frequent visits to sequelize documentation I started to discover the differences between different SQL dialects.
- I learned how to use `[Op.or]` operator.
- I learned how to do grouping and aggregation using Sequelize.
- I learned how to do **migrations** using Sequelize and why may one need it.
- The code written for migrations and for models have tiny differences, such as the case or the difference between "default" and "defaultValue".
- I learned that for tables without primary keys, one need to delete the default id key explicitly.