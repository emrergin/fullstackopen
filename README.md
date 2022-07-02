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

## Part 4 Part 4 Testing Express servers, user administration
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
- [Course](https://fullstackopen.com/en/part5)
- [My solutions](https://github.com/emrergin/fullstackopen/tree/main/part5)
## Part 6 State management with Redux
- [Course](https://fullstackopen.com/en/part6)
- [My solutions](https://github.com/emrergin/fullstackopen/tree/main/part6)
## Part 7 React router, custom hooks, styling app with CSS and webpack
- [Course](https://fullstackopen.com/en/part7)
- [My solutions](https://github.com/emrergin/fullstackopen/tree/main/part7)