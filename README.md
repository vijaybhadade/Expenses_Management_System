<<<<<<< HEAD
# ExpenseWise --- Expense Management System

ExpenseWise is a MERN-stack expense-management project built to practice
backend development with Node.js, Express, MongoDB, and Mongoose. The
backend supports user authentication, personal expense management,
pagination and filtering, and a dashboard that summarizes spending with
MongoDB aggregation.

> **Project status:** Backend development has reached the Dashboard API
> and its initial Postman testing (Day 14). Update this README as more
> features are implemented and verified.

## Table of Contents

-   [Project Goals](#project-goals)
-   [Technology Stack](#technology-stack)
-   [Current Features](#current-features)
-   [Backend Structure](#backend-structure)
-   [Getting Started](#getting-started)
-   [Environment Variables](#environment-variables)
-   [API Overview](#api-overview)
-   [Authentication](#authentication)
-   [Expenses API](#expenses-api)
-   [Dashboard API](#dashboard-api)
-   [Dashboard Validation and
    Testing](#dashboard-validation-and-testing)
-   [Error Handling](#error-handling)
-   [Security and Data Isolation](#security-and-data-isolation)
-   [Current Testing Status](#current-testing-status)
-   [Planned Improvements](#planned-improvements)
=======


ExpenseWise — Expense Management System

ExpenseWise is a MERN-stack expense-management project built to practice backend development with Node.js, Express, MongoDB, and Mongoose. The backend supports user authentication, personal expense management, pagination and filtering, and a dashboard that summarizes spending with MongoDB aggregation.

> **Project status:** Backend development has reached the Dashboard API and its initial Postman testing (Day 14). Update this README as more features are implemented and verified.

## Table of Contents

- [Project Goals](#project-goals)
- [Technology Stack](#technology-stack)
- [Current Features](#current-features)
- [Backend Structure](#backend-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Authentication](#authentication)
- [Expenses API](#expenses-api)
- [Dashboard API](#dashboard-api)
- [Dashboard Validation and Testing](#dashboard-validation-and-testing)
- [Error Handling](#error-handling)
- [Security and Data Isolation](#security-and-data-isolation)
- [Current Testing Status](#current-testing-status)
- [Planned Improvements](#planned-improvements)
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b

## Project Goals

The goals of ExpenseWise are to:

<<<<<<< HEAD
-   Build a structured REST API using Express.
-   Connect the backend to MongoDB using Mongoose.
-   Register users and authenticate them using hashed passwords and
    JWTs.
-   Allow each authenticated user to create, read, update, and delete
    their own expenses.
-   Add pagination and category filtering to expense listings.
-   Use MongoDB aggregation to calculate dashboard summaries.
-   Practice centralized error handling, request validation, and API
    testing with Postman.

## Technology Stack

-   **Runtime:** Node.js
-   **Backend framework:** Express.js
-   **Database:** MongoDB
-   **ODM:** Mongoose
-   **Authentication:** JSON Web Token (JWT)
-   **Password hashing:** bcrypt
-   **Security middleware:** Helmet
-   **Cross-origin requests:** CORS
-   **HTTP request logging:** Morgan
-   **Development:** Nodemon
-   **API testing:** Postman
=======
- Build a structured REST API using Express.
- Connect the backend to MongoDB using Mongoose.
- Register users and authenticate them using hashed passwords and JWTs.
- Allow each authenticated user to create, read, update, and delete their own expenses.
- Add pagination and category filtering to expense listings.
- Use MongoDB aggregation to calculate dashboard summaries.
- Practice centralized error handling, request validation, and API testing with Postman.

## Technology Stack

- **Runtime:** Node.js
- **Backend framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JSON Web Token (JWT)
- **Password hashing:** bcrypt
- **Security middleware:** Helmet
- **Cross-origin requests:** CORS
- **HTTP request logging:** Morgan
- **Development:** Nodemon
- **API testing:** Postman
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b

## Current Features

### Authentication and users

<<<<<<< HEAD
-   User model with name, email, password, role, and account status.
-   Email uniqueness and email-format validation.
-   Password hashing with bcrypt during registration.
-   Password comparison with bcrypt during login.
-   JWT creation with a one-hour expiry.
-   Authentication middleware that verifies a Bearer token and makes the
    authenticated user available to request handlers.

### Expense management

-   Create expenses with amount, category, optional description, and
    date.
-   Retrieve expenses belonging to the authenticated user.
-   Retrieve a single expense by its ID, scoped to the authenticated
    user.
-   Update only the supplied expense fields.
-   Delete an expense belonging to the authenticated user.
-   Validate positive amounts and category values.
-   Paginate expense lists using `page` and `limit`.
-   Filter expense lists by category.
-   Sort expense lists by date, newest first.

### Dashboard

-   Calculate total spending and total expense count.
-   Calculate spending and expense counts by category.
-   Return up to five recent expenses, newest first.
-   Support optional `from` and `to` date filtering.
-   Run the three dashboard queries concurrently with `Promise.all()`.
-   Apply the authenticated user's ID to each dashboard aggregation.

## Backend Structure

The backend follows a layered structure, separating routes, controllers,
services, models, middleware, and utilities. Your exact filenames may
differ as the project evolves.

``` text
=======
- User model with name, email, password, role, and account status.
- Email uniqueness and email-format validation.
- Password hashing with bcrypt during registration.
- Password comparison with bcrypt during login.
- JWT creation with a one-hour expiry.
- Authentication middleware that verifies a Bearer token and makes the authenticated user available to request handlers.

### Expense management

- Create expenses with amount, category, optional description, and date.
- Retrieve expenses belonging to the authenticated user.
- Retrieve a single expense by its ID, scoped to the authenticated user.
- Update only the supplied expense fields.
- Delete an expense belonging to the authenticated user.
- Validate positive amounts and category values.
- Paginate expense lists using `page` and `limit`.
- Filter expense lists by category.
- Sort expense lists by date, newest first.

### Dashboard

- Calculate total spending and total expense count.
- Calculate spending and expense counts by category.
- Return up to five recent expenses, newest first.
- Support optional `from` and `to` date filtering.
- Run the three dashboard queries concurrently with `Promise.all()`.
- Apply the authenticated user's ID to each dashboard aggregation.

## Backend Structure

The backend follows a layered structure, separating routes, controllers, services, models, middleware, and utilities. Your exact filenames may differ as the project evolves.

```text
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b
backend/
└── src/
    ├── config/          # Database and application configuration
    ├── controllers/     # Read requests, call services, send responses
    ├── middleware/      # Authentication and centralized error handling
    ├── models/          # Mongoose schemas and models
    ├── routes/          # Express route definitions
    ├── services/        # Business logic and database operations
    └── utils/           # Shared helpers, errors, and JWT utilities
```

### Request flow

A typical protected API request follows this flow:

<<<<<<< HEAD
1.  The client sends an HTTP request with a Bearer token.
2.  Authentication middleware verifies the token.
3.  The controller validates request inputs and calls the relevant
    service.
4.  The service performs the database operation.
5.  The controller returns a JSON response.
6.  Errors are forwarded to the centralized error middleware.
=======
1. The client sends an HTTP request with a Bearer token.
2. Authentication middleware verifies the token.
3. The controller validates request inputs and calls the relevant service.
4. The service performs the database operation.
5. The controller returns a JSON response.
6. Errors are forwarded to the centralized error middleware.
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b

## Getting Started

### Prerequisites

Install the following before running the project:

<<<<<<< HEAD
-   Node.js and npm
-   MongoDB running locally or a MongoDB connection URI
-   Postman (for API testing)
=======
- Node.js and npm
- MongoDB running locally or a MongoDB connection URI
- Postman (for API testing)
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b

### Install dependencies

Open a terminal in the backend directory:

<<<<<<< HEAD
``` bash
=======
```bash
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b
cd backend
npm install
```

### Configure environment variables

<<<<<<< HEAD
Create a `.env` file in the backend directory. Use the variable names
expected by your application:

``` env
=======
Create a `.env` file in the backend directory. Use the variable names expected by your application:

```env
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b
PORT=5000
MONGO_URL=mongodb://127.0.0.1:27017/Expenses_Management_System
JWT_SECRET=replace_with_a_long_random_secret
```

<<<<<<< HEAD
**Important:** The project may currently use a different name for the
JWT secret variable (for example, `secret`). Check the existing token
utility and `.env` access in your code, and make the names match. Never
commit real secrets or tokens to GitHub.
=======
**Important:** The project may currently use a different name for the JWT secret variable (for example, `secret`). Check the existing token utility and `.env` access in your code, and make the names match. Never commit real secrets or tokens to GitHub.
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b

Ensure MongoDB is running before starting the server.

### Start the backend

<<<<<<< HEAD
Use the script defined in your `package.json`. If the project has a
Nodemon development script, it may be:

``` bash
=======
Use the script defined in your `package.json`. If the project has a Nodemon development script, it may be:

```bash
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b
npm run dev
```

Otherwise, use the actual script configured in `package.json`.

<<<<<<< HEAD
The configured server port is currently `5000`. The base URL used in the
examples below is:

``` text
=======
The configured server port is currently `5000`. The base URL used in the examples below is:

```text
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b
http://localhost:5000
```

## Environment Variables

<<<<<<< HEAD
  --------------------------------------------------------------------------------------------------------
  Variable                Purpose                 Example
  ----------------------- ----------------------- --------------------------------------------------------
  `PORT`                  Port used by Express    `5000`

  `MONGO_URL`             MongoDB connection URI  `mongodb://127.0.0.1:27017/Expenses_Management_System`

  JWT secret variable     Secret used to sign and Set privately in `.env`; use the exact name expected by
                          verify JWTs             your code
  --------------------------------------------------------------------------------------------------------
=======
| Variable | Purpose | Example |
|---|---|---|
| `PORT` | Port used by Express | `5000` |
| `MONGO_URL` | MongoDB connection URI | `mongodb://127.0.0.1:27017/Expenses_Management_System` |
| JWT secret variable | Secret used to sign and verify JWTs | Set privately in `.env`; use the exact name expected by your code |
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b

Do not upload `.env` to source control. Add it to `.gitignore`.

## API Overview

<<<<<<< HEAD
All endpoint paths below assume the application mounts its API router at
`/api`. Confirm each route name in your route files before publishing or
sharing the API documentation.

  ---------------------------------------------------------------------------
  Feature           Method            Endpoint              Authentication
  ----------------- ----------------- --------------------- -----------------
  Register          POST              Use the registration  Usually public
                                      path defined in your  
                                      auth routes           

  Login             POST              Use the login path    Public
                                      defined in your auth  
                                      routes                

  Create expense    POST              `/api/expenses`       Required

  List expenses     GET               `/api/expenses`       Required

  Get one expense   GET               `/api/expenses/:id`   Required

  Update expense    PUT/PATCH         `/api/expenses/:id`   Required

  Delete expense    DELETE            `/api/expenses/:id`   Required

  Dashboard summary GET               `/api/dashboard`      Required
  ---------------------------------------------------------------------------

The registration and login route names are intentionally not hard-coded
here because they should match the exact routes in the current codebase.
=======
All endpoint paths below assume the application mounts its API router at `/api`. Confirm each route name in your route files before publishing or sharing the API documentation.

| Feature | Method | Endpoint | Authentication |
|---|---|---|---|
| Register | POST | Use the registration path defined in your auth routes | Usually public |
| Login | POST | Use the login path defined in your auth routes | Public |
| Create expense | POST | `/api/expenses` | Required |
| List expenses | GET | `/api/expenses` | Required |
| Get one expense | GET | `/api/expenses/:id` | Required |
| Update expense | PUT/PATCH | `/api/expenses/:id` | Required |
| Delete expense | DELETE | `/api/expenses/:id` | Required |
| Dashboard summary | GET | `/api/dashboard` | Required |

The registration and login route names are intentionally not hard-coded here because they should match the exact routes in the current codebase.
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b

## Authentication

Protected endpoints expect a JWT in the `Authorization` header:

<<<<<<< HEAD
``` http
Authorization: Bearer <your_jwt_token>
```

Use the token returned by your login endpoint. Do not share real tokens
in screenshots, README files, or public repositories.

The authentication middleware verifies the token and attaches the
authenticated user's identity to the request. Protected expense and
dashboard operations should use this authenticated identity rather than
trusting a `userId` sent by the client.
=======
```http
Authorization: Bearer <your_jwt_token>
```

Use the token returned by your login endpoint. Do not share real tokens in screenshots, README files, or public repositories.

The authentication middleware verifies the token and attaches the authenticated user's identity to the request. Protected expense and dashboard operations should use this authenticated identity rather than trusting a `userId` sent by the client.
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b

## Expenses API

The expense model currently uses these fields:

<<<<<<< HEAD
  -----------------------------------------------------------------------
  Field                               Purpose
  ----------------------------------- -----------------------------------
  `userId`                            Reference to the owning user

  `amount`                            Expense amount; must be positive

  `category`                          Expense category

  `description`                       Optional description

  `date`                              Expense date; defaults to the
                                      current date

  `createdAt`, `updatedAt`            Timestamps managed by Mongoose, if
                                      enabled in the schema
  -----------------------------------------------------------------------

The categories currently used in the project are:

-   `Food`
-   `Fashion`
-   `Equipment`
-   `Electronics`

Use the exact spelling and capitalization expected by the Mongoose
schema.
=======
| Field | Purpose |
|---|---|
| `userId` | Reference to the owning user |
| `amount` | Expense amount; must be positive |
| `category` | Expense category |
| `description` | Optional description |
| `date` | Expense date; defaults to the current date |
| `createdAt`, `updatedAt` | Timestamps managed by Mongoose, if enabled in the schema |

The categories currently used in the project are:

- `Food`
- `Fashion`
- `Equipment`
- `Electronics`

Use the exact spelling and capitalization expected by the Mongoose schema.
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b

### Create an expense

**Request:** `POST /api/expenses`

Example request body:

<<<<<<< HEAD
``` json
=======
```json
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b
{
  "amount": 250,
  "category": "Food",
  "description": "Lunch"
}
```

<<<<<<< HEAD
The server should take `userId` from the authenticated request, not from
the request body.
=======
The server should take `userId` from the authenticated request, not from the request body.
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b

### List expenses

**Request:** `GET /api/expenses`

Supported query parameters include:

<<<<<<< HEAD
-   `page` --- page number (defaults to `1`).
-   `limit` --- number of results per page (defaults to `10`, with a
    maximum of `100`).
-   `category` --- optional category filter.

Example:

``` text
GET /api/expenses?page=1&limit=10&category=Food
```

The list service returns the current page of expenses and the total
count matching the filter, allowing the controller to calculate
pagination metadata.

### Get, update, and delete an expense

-   `GET /api/expenses/:id` retrieves an expense only if it belongs to
    the authenticated user.
-   `PUT` or `PATCH /api/expenses/:id` updates supplied fields after
    validation.
-   `DELETE /api/expenses/:id` deletes only an expense belonging to the
    authenticated user.
=======
- `page` — page number (defaults to `1`).
- `limit` — number of results per page (defaults to `10`, with a maximum of `100`).
- `category` — optional category filter.

Example:

```text
GET /api/expenses?page=1&limit=10&category=Food
```

The list service returns the current page of expenses and the total count matching the filter, allowing the controller to calculate pagination metadata.

### Get, update, and delete an expense

- `GET /api/expenses/:id` retrieves an expense only if it belongs to the authenticated user.
- `PUT` or `PATCH /api/expenses/:id` updates supplied fields after validation.
- `DELETE /api/expenses/:id` deletes only an expense belonging to the authenticated user.
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b

Use the exact update method enabled by your Express routes.

## Dashboard API

### Get dashboard summary

**Method:** `GET`

**Endpoint:** `/api/dashboard`

<<<<<<< HEAD
**Authentication:** Required --- JWT Bearer token.

The dashboard returns summary statistics for the currently authenticated
user. It supports all-time results or an optional date range.

### Query parameters

  -----------------------------------------------------------------------
  Parameter               Required                Description
  ----------------------- ----------------------- -----------------------
  `from`                  Optional; must be       Start date in
                          provided together with  `YYYY-MM-DD` format
                          `to`                    

  `to`                    Optional; must be       End date in
                          provided together with  `YYYY-MM-DD` format
                          `from`                  
  -----------------------------------------------------------------------

If neither parameter is supplied, the dashboard returns all-time
statistics for the authenticated user. If a date range is supplied, both
parameters must be present and valid. The start date must not be later
than the end date.
=======
**Authentication:** Required — JWT Bearer token.

The dashboard returns summary statistics for the currently authenticated user. It supports all-time results or an optional date range.

### Query parameters

| Parameter | Required | Description |
|---|---|---|
| `from` | Optional; must be provided together with `to` | Start date in `YYYY-MM-DD` format |
| `to` | Optional; must be provided together with `from` | End date in `YYYY-MM-DD` format |

If neither parameter is supplied, the dashboard returns all-time statistics for the authenticated user. If a date range is supplied, both parameters must be present and valid. The start date must not be later than the end date.
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b

### Example requests

All-time dashboard:

<<<<<<< HEAD
``` http
=======
```http
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b
GET /api/dashboard
Authorization: Bearer <your_jwt_token>
```

Single-day dashboard:

<<<<<<< HEAD
``` http
=======
```http
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b
GET /api/dashboard?from=2026-10-06&to=2026-10-06
Authorization: Bearer <your_jwt_token>
```

Multi-day dashboard:

<<<<<<< HEAD
``` http
=======
```http
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b
GET /api/dashboard?from=2026-10-01&to=2026-10-11
Authorization: Bearer <your_jwt_token>
```

### Successful response example

<<<<<<< HEAD
The values below illustrate the response structure from the current test
data:

``` json
=======
The values below illustrate the response structure from the current test data:

```json
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b
{
  "success": true,
  "result": {
    "stats": {
      "totalSpend": 1200,
      "totalExpenses": 3
    },
    "categoryStats": [
      {
        "_id": "Fashion",
        "totalSpend": 500,
        "totalExpenses": 1
      },
      {
        "_id": "Food",
        "totalSpend": 700,
        "totalExpenses": 2
      }
    ],
    "recentExpenses": [
      {
        "_id": "example_expense_id",
        "amount": 100,
        "category": "Food",
        "description": "Example expense",
        "date": "2026-10-06T13:03:03.149Z"
      }
    ]
  }
}
```

<<<<<<< HEAD
The `recentExpenses` array above is shortened for documentation; the
actual response may contain up to five records and may include
additional Mongoose fields.

### Response fields

-   **`stats.totalSpend`** --- sum of all matching expense amounts.
-   **`stats.totalExpenses`** --- count of all matching expenses.
-   **`categoryStats`** --- one entry per category with `totalSpend` and
    `totalExpenses`.
-   **`recentExpenses`** --- up to five matching expenses, sorted by
    date descending (newest first).
=======
The `recentExpenses` array above is shortened for documentation; the actual response may contain up to five records and may include additional Mongoose fields.

### Response fields

- **`stats.totalSpend`** — sum of all matching expense amounts.
- **`stats.totalExpenses`** — count of all matching expenses.
- **`categoryStats`** — one entry per category with `totalSpend` and `totalExpenses`.
- **`recentExpenses`** — up to five matching expenses, sorted by date descending (newest first).
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b

### How the dashboard works

The dashboard service calls three functions using `Promise.all()`:

<<<<<<< HEAD
1.  `getExpenseStatsByService()` calculates overall totals.
2.  `getCategoryStatsByServices()` groups matching expenses by category.
3.  `getRecentExpensesByService()` sorts matching expenses by date
    descending and limits the results to five.

The shared `buildExpenseMatch()` helper creates the aggregation filter.
It applies the authenticated `userId` and, when both dates are provided,
the date range. This helps keep the filters consistent across all three
dashboard queries.

The date filter uses an inclusive start and an exclusive end: `$gte` for
the start date and `$lt` for the day after the selected end date. This
pattern includes expenses throughout the selected end date for date-only
inputs.

**Important implementation note:** Validate date inputs in the
controller before starting aggregation. Ensure the accepted input format
is clearly defined and that invalid dates are rejected. If the
application accepts date-only strings, test timezone behavior as well.

### Dashboard error responses

The controller is intended to reject invalid query parameters before
running aggregation.

  -----------------------------------------------------------------------
  Case                    Expected status         Meaning
  ----------------------- ----------------------- -----------------------
  Only `from` or only     `400 Bad Request`       Both date parameters
  `to` provided                                   must be supplied
                                                  together

  Invalid date format     `400 Bad Request`       A supplied date is not
                                                  valid

  `from` later than `to`  `400 Bad Request`       The range is reversed

  Missing or invalid JWT  `401 Unauthorized`      Authentication is
                                                  required or failed
  -----------------------------------------------------------------------

The response body follows the project's error format, for example:

``` json
=======
1. `getExpenseStatsByService()` calculates overall totals.
2. `getCategoryStatsByServices()` groups matching expenses by category.
3. `getRecentExpensesByService()` sorts matching expenses by date descending and limits the results to five.

The shared `buildExpenseMatch()` helper creates the aggregation filter. It applies the authenticated `userId` and, when both dates are provided, the date range. This helps keep the filters consistent across all three dashboard queries.

The date filter uses an inclusive start and an exclusive end: `$gte` for the start date and `$lt` for the day after the selected end date. This pattern includes expenses throughout the selected end date for date-only inputs.

**Important implementation note:** Validate date inputs in the controller before starting aggregation. Ensure the accepted input format is clearly defined and that invalid dates are rejected. If the application accepts date-only strings, test timezone behavior as well.

### Dashboard error responses

The controller is intended to reject invalid query parameters before running aggregation.

| Case | Expected status | Meaning |
|---|---|---|
| Only `from` or only `to` provided | `400 Bad Request` | Both date parameters must be supplied together |
| Invalid date format | `400 Bad Request` | A supplied date is not valid |
| `from` later than `to` | `400 Bad Request` | The range is reversed |
| Missing or invalid JWT | `401 Unauthorized` | Authentication is required or failed |

The response body follows the project's error format, for example:

```json
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b
{
  "success": false,
  "message": "from or to missing!"
}
```

<<<<<<< HEAD
Check the actual HTTP status in Postman as well as the JSON response
body. An error-shaped JSON response alone does not prove the server
returned HTTP 400.
=======
Check the actual HTTP status in Postman as well as the JSON response body. An error-shaped JSON response alone does not prove the server returned HTTP 400.
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b

## Dashboard Validation and Testing

Use Postman to test the dashboard with a valid Bearer token.

<<<<<<< HEAD
  ----------------------------------------------------------------------------------
  Test                    Example                            Expected behavior
  ----------------------- ---------------------------------- -----------------------
  All-time                `GET /api/dashboard`               Totals for all expenses
                                                             belonging to the
                                                             current user

  Single-day range        `?from=2026-10-06&to=2026-10-06`   Expenses on that date

  Multi-day range         `?from=2026-10-01&to=2026-10-11`   Expenses within the
                                                             selected dates

  Missing date            `?from=2026-10-06`                 HTTP 400

  Invalid date            `?from=abc&to=2026-10-06`          HTTP 400

  Reversed range          `?from=2026-10-11&to=2026-10-06`   HTTP 400

  User isolation          Call with two different users'     Each user sees only
                          tokens                             their own expenses
  ----------------------------------------------------------------------------------
=======
| Test | Example | Expected behavior |
|---|---|---|
| All-time | `GET /api/dashboard` | Totals for all expenses belonging to the current user |
| Single-day range | `?from=2026-10-06&to=2026-10-06` | Expenses on that date |
| Multi-day range | `?from=2026-10-01&to=2026-10-11` | Expenses within the selected dates |
| Missing date | `?from=2026-10-06` | HTTP 400 |
| Invalid date | `?from=abc&to=2026-10-06` | HTTP 400 |
| Reversed range | `?from=2026-10-11&to=2026-10-06` | HTTP 400 |
| User isolation | Call with two different users' tokens | Each user sees only their own expenses |
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b

### Verify aggregation accuracy

For a given user and date range:

<<<<<<< HEAD
1.  `stats.totalSpend` should equal the sum of all matching expense
    amounts.
2.  `stats.totalExpenses` should equal the count of all matching
    expenses.
3.  The sum of `categoryStats.totalSpend` should equal
    `stats.totalSpend`.
4.  The sum of `categoryStats.totalExpenses` should equal
    `stats.totalExpenses`.
5.  `recentExpenses` should contain no more than five records and should
    be sorted newest first.

The recent-expenses limit applies only to `recentExpenses`. It must not
limit `stats` or `categoryStats`.

### Verify user isolation

1.  Sign in as User A and call the dashboard using User A's token.
2.  Sign in as User B and call the dashboard using User B's token.
3.  Compare the results and confirm that each user's expenses and
    statistics remain separate.
4.  Create an expense for one user and confirm it does not appear in the
    other user's dashboard.

## Error Handling

The backend uses error handling to return consistent JSON errors.
Controllers should forward errors to the centralized error middleware
rather than duplicating error-response logic in every route.

Validation should cover, as applicable:

-   Missing required fields.
-   Invalid amounts or categories.
-   Invalid MongoDB IDs.
-   Invalid date parameters.
-   Unauthorized requests.
-   Attempts to access another user's expense.
=======
1. `stats.totalSpend` should equal the sum of all matching expense amounts.
2. `stats.totalExpenses` should equal the count of all matching expenses.
3. The sum of `categoryStats.totalSpend` should equal `stats.totalSpend`.
4. The sum of `categoryStats.totalExpenses` should equal `stats.totalExpenses`.
5. `recentExpenses` should contain no more than five records and should be sorted newest first.

The recent-expenses limit applies only to `recentExpenses`. It must not limit `stats` or `categoryStats`.

### Verify user isolation

1. Sign in as User A and call the dashboard using User A's token.
2. Sign in as User B and call the dashboard using User B's token.
3. Compare the results and confirm that each user's expenses and statistics remain separate.
4. Create an expense for one user and confirm it does not appear in the other user's dashboard.

## Error Handling

The backend uses error handling to return consistent JSON errors. Controllers should forward errors to the centralized error middleware rather than duplicating error-response logic in every route.

Validation should cover, as applicable:

- Missing required fields.
- Invalid amounts or categories.
- Invalid MongoDB IDs.
- Invalid date parameters.
- Unauthorized requests.
- Attempts to access another user's expense.
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b

Always verify both the response body and HTTP status code in Postman.

## Security and Data Isolation

<<<<<<< HEAD
-   Passwords should be stored as bcrypt hashes, never as plaintext.
-   JWTs should be signed with a secret stored in environment variables.
-   Protected routes should use authentication middleware.
-   The backend should derive the owner `userId` from the verified
    token.
-   Database queries for user-owned expenses and dashboard aggregations
    should include the authenticated user's ID.
-   Never commit `.env` files, JWTs, passwords, or real user credentials
    to source control.
=======
- Passwords should be stored as bcrypt hashes, never as plaintext.
- JWTs should be signed with a secret stored in environment variables.
- Protected routes should use authentication middleware.
- The backend should derive the owner `userId` from the verified token.
- Database queries for user-owned expenses and dashboard aggregations should include the authenticated user's ID.
- Never commit `.env` files, JWTs, passwords, or real user credentials to source control.
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b

## Current Testing Status

Based on the Postman responses reviewed during development:

<<<<<<< HEAD
-   [x] All-time dashboard response reviewed; totals and category
    calculations matched for the sample data.
-   [x] Single-day dashboard response reviewed for `2026-10-06`.
-   [x] Missing-date request returned an error response.
-   [x] Invalid-date request returned an error response.
-   [x] Reversed-date request returned an error response.
-   [x] Dashboard responses for two accounts showed different user data,
    consistent with user-level filtering.
-   [ ] Confirm HTTP `400` status for each invalid-date request.
-   [ ] Test the five-record recent-expenses limit with six or more
    matching expenses.
-   [ ] Test a date range containing both matching and non-matching
    expenses.
-   [ ] Finish README review against the exact route names and
    environment-variable names in the code.

These checkboxes describe the tests reported so far; they do not replace
a full automated test suite.

## Planned Improvements

-   Add automated integration tests for authentication, expenses, and
    dashboard endpoints.
-   Expand error-handling tests for malformed IDs and invalid request
    bodies.
-   Add more dashboard date-range boundary tests.
-   Document exact registration and login routes after checking the auth
    route file.
-   Add frontend dashboard charts and summary cards when the frontend
    integration is implemented.
-   Add CI checks and keep the README updated as new features are
    completed.
=======
- [x] All-time dashboard response reviewed; totals and category calculations matched for the sample data.
- [x] Single-day dashboard response reviewed for `2026-10-06`.
- [x] Missing-date request returned an error response.
- [x] Invalid-date request returned an error response.
- [x] Reversed-date request returned an error response.
- [x] Dashboard responses for two accounts showed different user data, consistent with user-level filtering.
- [ ] Confirm HTTP `400` status for each invalid-date request.
- [ ] Test the five-record recent-expenses limit with six or more matching expenses.
- [ ] Test a date range containing both matching and non-matching expenses.
- [ ] Finish README review against the exact route names and environment-variable names in the code.

These checkboxes describe the tests reported so far; they do not replace a full automated test suite.

## Planned Improvements

- Add automated integration tests for authentication, expenses, and dashboard endpoints.
- Expand error-handling tests for malformed IDs and invalid request bodies.
- Add more dashboard date-range boundary tests.
- Document exact registration and login routes after checking the auth route file.
- Add frontend dashboard charts and summary cards when the frontend integration is implemented.
- Add CI checks and keep the README updated as new features are completed.
"""

out_path = Path("/mnt/data/README.md")
pypandoc.convert_text(readme, "md", format="md", outputfile=str(out_path), extra_args=["--standalone"])
print(f"Created: {out_path}")
print(f"Size: {out_path.stat().st_size} bytes")
>>>>>>> 8392f8fe8e11f5648c8cb2a4508ab0c3ff528d1b
>>>>>>


## Budget Management API

The Budget Management module allows authenticated users to create, retrieve, update, and delete monthly budgets for different expense categories.

### Authentication

All Budget endpoints require a valid JWT access token.

Include the token in the request header:

```http
Authorization: Bearer <JWT_TOKEN>
```

The authenticated user's ID is obtained from `req.user.userId`, rather than trusting a `userId` supplied by the client. This helps enforce user-specific budget access.

### Budget Categories

The supported categories are:

- Food & Dining
- Groceries
- Transportation
- Housing & Rent
- Utilities
- Healthcare
- Shopping
- Entertainment
- Education
- Personal Care
- Travel
- EMI & Loans
- Insurance
- Family & Gifts

### API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/budget` | Create a new budget |
| GET | `/api/budget` | Retrieve budgets, with optional filters |
| PATCH | `/api/budget` | Create or update a budget using upsert |
| DELETE | `/api/budget/:budgetId` | Delete a budget by ID |

> Adjust the paths if your application's main router mounts the Budget router at a different prefix.

### 1. Create Budget

**Endpoint:** `POST /api/budget`

Creates a budget for a category and month.

Example request body:

```json
{
  "category": "Food & Dining",
  "limit": 3000,
  "month": "2026-10"
}
```

**Behavior:**
- Requires `category`, `limit`, and `month`.
- The category must be supported.
- The limit must be a positive, finite number.
- The month must use the `YYYY-MM` format.
- The month is normalized to the first day of the month in UTC.
- Creating a duplicate budget for the same user, category, and month returns a conflict response.

**Success status:** `201 Created`

### 2. Get Budgets

**Endpoint:** `GET /api/budget`

Retrieves budgets belonging to the authenticated user.

Optional query parameters:

| Parameter | Description | Example |
|---|---|---|
| `category` | Filter by category | `Food & Dining` |
| `month` | Filter by month (`YYYY-MM`) | `2026-10` |

Example requests:

```http
GET /api/budget
GET /api/budget?category=Food%20%26%20Dining
GET /api/budget?month=2026-10
```

**Behavior:**
- Returns only the authenticated user's budgets.
- Supports optional category and month filters.
- Returns an empty array when no matching budgets are found.

**Success status:** `200 OK`

### 3. Upsert Budget

**Endpoint:** `PATCH /api/budget`

Creates a budget if no matching record exists; otherwise, updates the existing budget.

Example request body:

```json
{
  "category": "Food & Dining",
  "limit": 4000,
  "month": "2026-10"
}
```

**Behavior:**
- Matches a budget using the authenticated user's ID, category, and normalized month.
- Updates the existing budget if a match is found.
- Creates a new budget if no match exists.
- Validates the input before saving.
- Uses the compound unique index to help prevent duplicate budgets.

**Success status:** `200 OK`

### 4. Delete Budget

**Endpoint:** `DELETE /api/budget/:budgetId`

Deletes a budget owned by the authenticated user.

Example request:

```http
DELETE /api/budget/68f000000000000000000001
```

**Behavior:**
- Validates the budget ID.
- Deletes only a budget matching both the budget ID and authenticated user's ID.
- Returns a not-found response if no matching budget exists.

**Success status:** `200 OK`

### Error Handling

| HTTP status | Meaning |
|---|---|
| `400 Bad Request` | Invalid input, month format, or budget ID |
| `401 Unauthorized` | Missing or invalid authentication token |
| `404 Not Found` | No matching budget found for the authenticated user |
| `409 Conflict` | A duplicate budget already exists |
| `500 Internal Server Error` | Unexpected server-side error |

Actual responses depend on the application's authentication and centralized error-handling middleware.

### Database Constraints

The Budget model uses a compound unique index on:

```javascript
{ userId: 1, category: 1, month: 1 }
```

This enforces uniqueness for each user's category and normalized month combination.

### Request Flow

The Budget API follows this backend architecture:

**Route → Authentication Middleware → Controller → Service → Budget Model → MongoDB → Service → Controller → Client**

- **Route:** Matches the HTTP request.
- **Authentication middleware:** Verifies the JWT and identifies the user.
- **Controller:** Extracts request data, calls the service, and sends the response.
- **Service:** Performs input validation and business logic.
- **Budget Model:** Defines the schema and database operations.
- **MongoDB:** Stores and retrieves budget records.

