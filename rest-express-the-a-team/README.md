# Making Our Own Library (the books kind)

## Requirements

| Method | Path             | Additional Info | Result                                         | Response                                  |
| ------ | ---------------- | --------------- | ---------------------------------------------- | ----------------------------------------- |
| GET    | /books           |                 | all books                                      | { success: Boolean, payload: Book Array } |
| GET    | /books           | ?search=potter  | all books with “potter” in the title           | { success: Boolean, payload: Book Array } |
| GET    | /books           | ?author=austen  | all books who have “austen” in the author name | { success: Boolean, payload: Book Array } |
| GET    | /books/<book_id> |                 | books with a particular id if it exists        | { success: Boolean, payload: Book }       |
| POST   | /books           | { body }        | create a new book                              | { success: Boolean, payload: Book }       |
| PUT    | /books/<book_id> | { body }        | updated book                                   | { success: Boolean, payload: Book }       |
| DELETE | /books/<book_id> |                 | book deleted                                   | { success: Boolean, payload: Book }       |

Bonus:

| Method | Path             | Additional Info | Result       |
| ------ | ---------------- | --------------- | ------------ |
| PATCH  | /books/<book_id> | { body }        | updated book |

## Setup

We are going to use Express Generator to set up our project. The best way to do this is using `npx` which is the package runner (similar to the `npm` command which is the package manager).

`npx express --no-view`

Have a look around the code that is generated for you. What are the things you notice? Talk them through with your partner and try to understand what's going on. In particular, look at how the `routes` are set up.

## Our Books

The data for our library is in the `data.js` file. We want to serve this information in a RESTful API in this project. The best first step is to create a "Model" we can interact with. Create a folder called `models` and then a file called `books.js`. This file will contain all of the functions which will interact with our data, e.g. `getBooks`, `getBookById`, `deleteBookById`, etc.

For now, require in the data from our `data.js` file (long term this will ideally come from a database). Plan all the functions you think you will need to achieve all of our required api functionality. Create all those functions. Export them so they can be used elsewhere.

These functions are now ready to be used in your routes.

## Our Routes

Create the routes from the requirements, and use the functions you created in the previous section to allow us to fulfil the routes and what they need.

## Our Database

Now your should refactor your code so that instead of interacting with data from the file, and manipulating in memory, we are interacting with a database. You will need to connect to a database, create a new table, populate it with the data from our file, and then change the functions so that they interact with the database instead. Our routes shouldn't need to be changed - the functions should hand back the same things as they did before.

You should follow our usual pattern:

- create a `db` folder
- create an `index.js` file which connects to our database, and exports a way to communicate with it
- create a `scripts` folder with files which run our one-off scripts like creating a table and populating it initially with data
- create npm scripts in your package.json which run these files
- make sure you are using environment variables to hide any sensitive data from your codebase (use a .env file, the dotenv module and `-r dotenv/config` command syntax to mean your code shouldn't have to know about the dotenv module)

## Bonus

Now create a dedicated route for authors. The table below outlines the desired functionality.

| Method | Path                 | Additional Info | Result                                    | Response                                    |
| ------ | -------------------- | --------------- | ----------------------------------------- | ------------------------------------------- |
| GET    | /authors             |                 | all authors                               | { success: Boolean, payload: Author Array } |
| GET    | /authors             | ?search=austen  | all authors with “austen” in their name   | { success: Boolean, payload: Author Array } |
| GET    | /authors/<author_id> |                 | authors with a particular id if it exists | { success: Boolean, payload: Author }       |
| POST   | /authors             | { body }        | create a new author                       | { success: Boolean, payload: Author }       |
| PUT    | /authors/<author_id> | { body }        | updated author                            | { success: Boolean, payload: Author }       |
| DELETE | /authors/<author_id> |                 | author deleted                            | { success: Boolean, payload: Author }       |

Bonus:

| Method | Path                 | Additional Info | Result         |
| ------ | -------------------- | --------------- | -------------- |
| PATCH  | /authors/<author_id> | { body }        | updated author |
