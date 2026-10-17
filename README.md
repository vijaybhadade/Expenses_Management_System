# ExpenseWise — Expense Management System

**ExpenseWise** is a MERN-stack expense-management project focused on backend development with **Node.js, Express, MongoDB, and Mongoose**. It provides authenticated expense and income management, budgets, dashboard summaries, a unified transaction history, recurring transaction rules, and scheduled recurring transaction automation.

> **Project Status:** The backend API modules and recurring automation scheduler have been implemented and manually tested during development. This README documents the current backend design and the test results reported during development. It is not a substitute for running tests against the current codebase.

---

## Table of Contents

1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Backend Structure](#backend-structure)
4. [Request Flows](#request-flows)
5. [Getting Started](#getting-started)
6. [Environment Variables](#environment-variables)
7. [Authentication](#authentication)
8. [API Overview](#api-overview)
9. [Expense Management](#expense-management)
10. [Income Management](#income-management)
11. [Dashboard](#dashboard)
12. [Budget Management](#budget-management)
13. [Transaction History](#transaction-history)
14. [Recurring Transactions](#recurring-transactions)
15. [Recurring Automation and Scheduler](#recurring-automation-and-scheduler)
16. [Validation and Error Handling](#validation-and-error-handling)
17. [Security and Data Integrity](#security-and-data-integrity)
18. [Testing Status](#testing-status)
19. [Known Limitations and Future Improvements](#known-limitations-and-future-improvements)

---

## Features

### 1. Authentication and Users

- User registration and login.
- Password hashing and password comparison using **bcrypt**.
- JWT-based authentication for protected routes.
- User roles and active-account status in the user model.

### 2. Expense Management

- Create, list, retrieve, update, and delete expenses.
- Expense categories and optional descriptions.
- Date validation, pagination, and category filtering.
- User-scoped expense queries.

### 3. Income Management

- Create, list, retrieve, update, and delete income records.
- Validated income sources, amounts, and dates.
- User-scoped income queries.

### 4. Dashboard

- Total spending and expense count.
- Spending and expense counts grouped by category.
- Up to five recent expenses.
- Optional date-range filtering.

### 5. Budget Management

- Create and manage monthly category budgets.
- Compare actual spending with budgets for a selected month.
- Calculate remaining budget, usage percentage, and budget status.

### 6. Transaction History

- Read-only unified transaction history using the existing Income and Expense collections.
- Filter by all transactions, income, or expenses.
- Pagination and newest-created-first ordering.

### 7. Recurring Transactions

- Create and manage recurring income or expense rules.
- Daily, weekly, monthly, and yearly frequencies.
- Pause rules without deleting them.
- Generate due transactions through an automation service and scheduled job.
- Catch up missed occurrences, respect end dates, and prevent duplicate scheduled records.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| npm | Package management |
| Express 5 | Backend framework and API routing |
| MongoDB | Database |
| Mongoose | MongoDB object data modeling |
| JSON Web Token (JWT) | Authentication |
| bcrypt | Password hashing |
| node-cron | Scheduled recurring automation |
| Helmet | HTTP security headers |
| CORS | Cross-origin request configuration |
| Morgan | HTTP request logging |
| Nodemon | Development server monitoring |
| Postman / Hoppscotch | API testing |
| MongoDB Compass | Database inspection |

---

## Backend Structure

The backend follows a layered architecture that separates routes, controllers, services, models, and database operations.

The project currently uses the folder name `middileware`. Preserve that spelling in import paths unless you rename the folder and update all related imports.

```text
backend/
├── config/
│   └── db.js
├── controllers/
├── middileware/
│   └── errorHandler.js
├── models/
├── routes/
├── services/
│   ├── recurringTransactionAutomationService.js
│   ├── recurringTransactionScheduler.js
│   ├── recurringTransactionService.js
│   ├── expenseService.js
│   ├── incomeService.js
│   ├── budgetService.js
│   ├── dashBordService.js
│   └── transactionService.js
├── utils/
├── testRecurringAutomation.js
├── testRecurringCatchUp.js
├── testRecurringEndDate.js
├── testRecurringErrorHandling.js
├── testRecurringPause.js
├── server.js
├── package.json
└── .env
```

**Important:** This is a representative structure based on the project files reviewed during development. Some route, controller, model, and utility files have been omitted for readability.

**Environment security:** The `.env` file is for local configuration only and must not be committed to source control.

### Responsibilities of Each Layer

| Layer | Responsibility |
|---|---|
| Routes | Define API endpoints and attach middleware |
| Middleware | Authenticate requests and handle shared request processing |
| Controllers | Handle requests and responses |
| Services | Implement business logic |
| Models | Define schemas and interact with MongoDB |
| MongoDB | Persist application data |
| Error middleware | Format and handle application errors |

---

## Request Flows

### 1. Protected API Request

```text
Client
  → Route
  → Authentication Middleware
  → Controller
  → Service
  → Model
  → MongoDB
  → Controller Response
  → Client
```

**Why this structure matters:** Each layer has a specific responsibility. Controllers handle HTTP concerns, while services contain business logic and models handle database operations.

### 2. Recurring Automation

```text
node-cron Scheduler
  → Recurring Automation Service
  → RecurringTransaction Model
  → MongoDB: Find Due Rules
  → Income or Expense Service
  → Income or Expense Model
  → MongoDB: Create Transaction
  → Advance the Rule's nextDueDate
```

The scheduler triggers the automation service. It does not contain the transaction-generation business logic itself.

---

## Getting Started

### Prerequisites

Install the following before running the backend:

- [Node.js](https://nodejs.org/)
- npm, included with Node.js
- MongoDB, running locally or accessible through a connection URI
- [Postman](https://www.postman.com/) or [Hoppscotch](https://hoppscotch.io/) for API testing
- [MongoDB Compass](https://www.mongodb.com/products/tools/compass) for database inspection

### Step 1: Open the Backend Directory

Open a terminal and run:

```bat
cd /d J:\Projects\Expenses_Management_System\backend
```

Adjust the path if your project is stored elsewhere.

### Step 2: Install Dependencies

```bash
npm install
```

The project uses `node-cron` for recurring automation scheduling.

### Step 3: Configure Environment Variables

Create a `.env` file inside the backend directory. Use the exact environment variable names read by your application.

Example:

```env
PORT=5000
MONGO_URL=mongodb://127.0.0.1:27017/Expenses_Management_System
```

Add the JWT secret variable required by your token utility. Check the source code for its exact name rather than assuming a placeholder variable name is correct.

### Step 4: Start the Backend

The current project configuration does not define `start` or `dev` scripts in `package.json`, according to the development notes.

Start the server from the backend directory:

```bash
node server.js
```

The application connects to MongoDB before starting Express and the recurring scheduler.

Expected startup output resembles:

```text
database connected successfully
Server is running on 5000 port
Recurring automation started...
```

The default development URL is:

```text
http://localhost:5000
```

**To stop the server:** Press `Ctrl + C` in the terminal.

---

## Environment Variables

| Variable | Purpose | Example |
|---|---|---|
| `PORT` | Port used by Express | `5000` |
| `MONGO_URL` | MongoDB connection URI | `mongodb://127.0.0.1:27017/Expenses_Management_System` |
| JWT secret variable | Signs and verifies authentication tokens | Configure privately using the exact name expected by the token utility |

**Security reminders:**

- Never commit `.env` to source control.
- Never expose JWT secrets or database credentials.
- Ensure `.env` is listed in `.gitignore`.
- Use separate credentials for development and production.

---

## Authentication

Protected endpoints expect a JWT in the `Authorization` header.

```http
Authorization: Bearer <your_jwt_token>
```

Use the token returned by the login endpoint.

The authentication middleware validates the token and makes the authenticated identity available to request handlers through:

```js
req.user
```

User-owned records should be queried using:

```js
req.user.userId
```

**Important:** Do not trust a client-supplied `userId` from the request body or query string to determine record ownership. Use the authenticated identity.

---

## API Overview

All endpoint paths below assume that `server.js` mounts the route modules at `/api`.

| Feature | Method | Endpoint | Authentication |
|---|---|---|---|
| Register | POST | Defined in user routes | Usually public |
| Login | POST | Defined in user routes | Public |
| Expenses | GET, POST | `/api/expenses` | Required |
| One expense | GET, PUT/PATCH, DELETE | `/api/expenses/:id` | Required |
| Dashboard | GET | `/api/dashboard` | Required |
| Income | GET, POST | `/api/income` | Required |
| One income | GET, PUT/PATCH, DELETE | `/api/income/:id` | Required |
| Budgets | GET, POST | Confirm budget route file | Required |
| Budget comparison | GET | `/api/budget/compare?month=YYYY-MM` | Required |
| Transactions | GET | `/api/transactions` | Required |
| Recurring rules | GET, POST | `/api/recurring-transactions` | Required |
| One recurring rule | GET, PATCH, DELETE | `/api/recurring-transactions/:id` | Required |

> **API verification required:** Confirm the exact authentication, expense, income, and budget paths and supported HTTP methods against the current route files before treating this table as the formal API contract.

The recurring transaction and transaction-history paths above reflect the routes documented during development.

---

## Expense Management

Expense records contain:

- `userId`: Reference to the owning user.
- `amount`: Expense amount.
- `category`: Expense category.
- `description`: Optional description.
- `date`: Expense date.
- `createdAt` and `updatedAt`: Mongoose timestamps.

Recurring-generated expenses also store:

- `recurringRuleId`: Reference to the recurring rule.
- `scheduledOccurrenceDate`: Date of the scheduled occurrence.

These fields make it possible to trace an expense back to its recurring rule and identify the occurrence that generated it.

### Supported Expense Categories

1. Food & Dining
2. Groceries
3. Transportation
4. Housing & Rent
5. Utilities
6. Healthcare
7. Shopping
8. Entertainment
9. Education
10. Personal Care
11. Travel
12. EMI & Loans
13. Insurance
14. Family & Gifts

### Pagination Example

```http
GET /api/expenses?page=1&limit=10
Authorization: Bearer <your_jwt_token>
```

The list endpoint supports pagination with a default page and limit and a maximum limit of `100`, as implemented in the service.

Expense endpoints support user-scoped CRUD operations.

**Note:** Use the exact request body and update method supported by the current expense route and controller.

---

## Income Management

Income records contain:

- `userId`: Reference to the owning user.
- `amount`: Income amount.
- `source`: Income source.
- `description`: Optional description.
- `date`: Income date.
- `createdAt` and `updatedAt`: Mongoose timestamps.

Recurring-generated income records also store `recurringRuleId` and `scheduledOccurrenceDate`.

### Allowed Income Sources

- Salary
- Freelance
- Business
- Investment
- Scholarship
- Gift

Income endpoints support user-scoped CRUD operations.

**Validation rules:**

- The amount must be a valid number and at least `1`.
- The source must match one of the allowed values.
- The date must be valid when provided.

---

## Dashboard

The dashboard endpoint is:

```http
GET /api/dashboard
Authorization: Bearer <your_jwt_token>
```

The dashboard provides:

- Total spending.
- Expense count.
- Category-level spending summaries.
- Up to five recent expenses.

Optional `from` and `to` query parameters can be used for date filtering when supported by the controller.

### Example Request

```http
GET /api/dashboard?from=2026-10-01&to=2026-10-31
Authorization: Bearer <your_jwt_token>
```

**Testing note:** Validate the response against the current dashboard service's date-boundary behavior. Test invalid dates and reversed date ranges through the API client.

---

## Budget Management

Budgets are associated with a user, category, monthly period, and spending limit.

The month uses the `YYYY-MM` format, for example:

```text
2026-10
```

Budget upsert behavior matches the authenticated user, category, and month.

### Budget Comparison Endpoint

```http
GET /api/budget/compare?month=2026-10
Authorization: Bearer <your_jwt_token>
```

The comparison groups expense totals by category and reports values such as:

- `actualSpending`
- `remainingBudget`
- Budget usage percentage
- Total expenses
- Budget status

### Budget Status Rules

| Usage | Status |
|---|---|
| More than 100% | `exceeded` |
| At least 90% and up to 100% | `near_limit` |
| Below 90% | `within_budget` |

**Important:** Check the actual route and controller response shape if the API response format changes.

---

## Transaction History

The transaction-history endpoint provides a read-only combined view of existing income and expense records.

```http
GET /api/transactions
Authorization: Bearer <your_jwt_token>
```

### Supported Query Parameters

| Parameter | Description | Default |
|---|---|---|
| `page` | Positive page number | `1` |
| `limit` | Page size, maximum `100` | `10` |
| `type` | `all`, `income`, or `expenses` | Confirm current service default |

### Examples

```http
GET /api/transactions?page=1&limit=10&type=all
GET /api/transactions?page=1&limit=10&type=income
GET /api/transactions?page=1&limit=10&type=expenses
```

Include the JWT authorization header with each request.

### Implementation Details

The API reuses the existing Income and Expense collections rather than creating a separate transaction collection.

For `type=all`, the service:

1. Retrieves the authenticated user's matching income and expense records.
2. Adds a transaction-type indicator.
3. Combines the results.
4. Sorts by `createdAt` in descending order.
5. Paginates the combined results.

**Known limitation:** Loading all matching records into application memory for the combined view may become inefficient when transaction histories grow large. Database-level sorting and pagination should be considered in future optimization work.

---

## Recurring Transactions

Recurring transaction rules describe future income or expenses.

**A recurring rule is not itself an income or expense record.** The automation service creates an actual record when an occurrence becomes due.

### Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/recurring-transactions` | Create a recurring rule |
| GET | `/api/recurring-transactions` | List the authenticated user's rules |
| GET | `/api/recurring-transactions/:id` | Retrieve one rule |
| PATCH | `/api/recurring-transactions/:id` | Partially update a rule |
| DELETE | `/api/recurring-transactions/:id` | Delete a rule |

All recurring transaction routes are protected by authentication. The user ID comes from `req.user.userId`.

### Recurring Rule Fields

| Field | Description |
|---|---|
| `userId` | Owning user, derived from the authenticated identity |
| `amount` | Positive transaction amount |
| `type` | `income` or `expense` |
| `category` | Income source or expense category, depending on the type |
| `description` | Optional description |
| `frequency` | `daily`, `weekly`, `monthly`, or `yearly` |
| `startDate` | Start date for the rule |
| `nextDueDate` | Next occurrence date to process |
| `endDate` | Optional final date for the rule |
| `isActive` | `true` while enabled; `false` to pause |
| `isMonthEnd` | Supports month-end behavior for monthly rules |
| `createdAt`, `updatedAt` | Mongoose timestamps |

For income rules, valid source values are Salary, Freelance, Business, Investment, Scholarship, and Gift.

For expense rules, use the expense categories listed in the Expense Management section.

### Example: Create a Recurring Income Rule

```http
POST /api/recurring-transactions
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

Request body:

```json
{
  "amount": 75000,
  "type": "income",
  "category": "Salary",
  "description": "Monthly salary",
  "frequency": "monthly",
  "startDate": "2026-09-01",
  "nextDueDate": "2026-10-01"
}
```

**Important:** Use the field names and date rules enforced by the current schema and service.

### Pausing and Deleting Rules

- Set `isActive` to `false` to pause a rule without deleting it.
- A paused rule is retained but is not processed by the automation service.
- Deleting a rule does not automatically delete historical income or expense records already created from it.

---

## Recurring Automation and Scheduler

### Components

| File | Responsibility |
|---|---|
| `services/recurringTransactionAutomationService.js` | Contains recurring-processing logic |
| `services/recurringTransactionScheduler.js` | Defines the scheduled job using `node-cron` |
| `server.js` | Starts the scheduler after the database connection succeeds |

### Execution Flow

```text
Server starts
  → MongoDB connection succeeds
  → Scheduler starts
  → Scheduled task triggers once per minute
  → Automation service finds active, due rules
  → Each due occurrence creates an Income or Expense record
  → Rule nextDueDate advances
```

### Cron Expression

The current cron expression is:

```js
"* * * * *"
```

This means the scheduled task runs **every minute**. This is useful for development and quick verification.

For deployment, choose a schedule appropriate to the product and hosting environment.

### Automation Behaviors Tested During Development

- **Due rules:** Processes active rules whose start and next-due dates are eligible.
- **Catch-up:** Processes multiple missed occurrences in sequence until the next due date is in the future or the rule reaches its end.
- **Duplicate prevention:** Income and Expense documents use a unique partial compound index on `recurringRuleId` and `scheduledOccurrenceDate` for recurring-generated records.
- **End dates:** A rule is deactivated when its next occurrence is beyond its configured end date.
- **Paused rules:** Rules with `isActive: false` are not processed.
- **Failure isolation:** A failure processing one rule is logged without preventing other due rules from being processed.
- **Date advancement:** After an occurrence is handled, the rule's `nextDueDate` is advanced according to its frequency.

### Duplicate Prevention

The unique compound index uses these fields:

```js
{
  recurringRuleId: 1,
  scheduledOccurrenceDate: 1
}
```

The indexes are configured as unique partial indexes for recurring-generated records.

This prevents multiple records with the same recurring rule and scheduled occurrence date from being inserted when the index applies.

**Important:** Unique indexes help prevent duplicate records, but they do not replace a distributed scheduler or locking mechanism when multiple backend instances are running.

### Scheduler Logs

Expected startup messages resemble:

```text
database connected successfully
Server is running on 5000 port
Recurring automation started...
```

A scheduled run may produce:

```text
Recurring automation started...
Due recurring rules found: 0
Recurring automation completed.
```

The due-rule count can be greater than zero.

**A count of zero is not an error by itself.** It means no eligible recurring rules were found during that run.

### Operational Notes

- Keep the server process running for the in-process scheduler to execute.
- If the process is stopped or the machine is offline, the scheduler does not run during that downtime.
- Catch-up logic can process missed occurrences when the service runs again, provided the rules remain eligible.
- Avoid running multiple application instances with the same in-process scheduler unless coordinated execution is implemented.
- Review timezone and date-boundary behavior before production deployment.
- Keep test rules and generated test transactions separate from real financial records.

---

## Validation and Error Handling

The backend uses route/controller/service separation and centralized error handling through the configured error middleware.

Expected validation areas include:

- Missing required fields.
- Invalid amounts, categories, sources, or frequency values.
- Invalid MongoDB IDs.
- Invalid dates and incompatible date ranges.
- Unsupported pagination parameters.
- Missing or invalid authentication tokens.
- Attempts to access another user's records.

### API Testing Recommendations

For each test, verify both:

1. The HTTP status code.
2. The response body.

Exact error messages depend on the route, service, schema, and shared error middleware.

---

## Security and Data Integrity

Follow these practices when developing and deploying ExpenseWise:

- Store passwords as bcrypt hashes, never as plaintext.
- Keep JWT signing secrets in environment variables.
- Protect user-specific routes with authentication middleware.
- Derive record ownership from the verified JWT using `req.user.userId`.
- Scope database queries for user-owned records to the authenticated user.
- Do not commit `.env` files, passwords, tokens, or production connection strings.
- Use Mongoose validators for supported updates.
- Use recurring transaction unique indexes to prevent duplicate scheduled occurrences.
- Back up the database before manually deleting test or financial records.

---

## Testing Status

The following recurring automation behaviors were **manually tested during development**, according to the project's development notes.

### Recurring Automation Checklist

- [x] Create a due recurring expense and advance `nextDueDate`.
- [x] Create a due recurring income and advance `nextDueDate`.
- [x] Verify duplicate prevention for the same recurring rule and scheduled occurrence date.
- [x] Catch up multiple missed daily occurrences.
- [x] Deactivate a rule when its next occurrence is after `endDate`.
- [x] Skip paused recurring rules.
- [x] Confirm one rule's processing error does not prevent another due rule from being processed.
- [x] Start the server, connect to MongoDB, and observe the scheduler run every minute.

Other module tests have also been performed manually with Postman/Hoppscotch and MongoDB Compass during development.

> **Testing disclaimer:** This checklist records reported manual verification. It does not claim that a complete automated integration test suite exists. Re-run tests against the current codebase before release.

---

## Known Limitations and Future Improvements

Recommended follow-up work:

1. **Add npm scripts** — Define appropriate `start` and development scripts in `package.json`.
2. **Automate integration testing** — Add tests for authentication, expenses, income, budgets, dashboard, transaction history, and recurring automation.
3. **Review date handling** — Test timezone consistency and monthly/yearly date edge cases.
4. **Prevent overlapping scheduler executions** — Add appropriate coordination and a distributed lock if multiple backend instances are deployed.
5. **Implement graceful shutdown** — Stop the scheduler and close the MongoDB connection cleanly.
6. **Review dependency security** — Run `npm audit` and evaluate findings without blindly applying breaking upgrades.
7. **Optimize transaction history** — Improve combined sorting and pagination for large datasets.
8. **Verify API contracts** — Confirm endpoint paths, HTTP methods, request bodies, and environment-variable names against the current source.
9. **Add API documentation** — Introduce OpenAPI/Swagger documentation when the route contracts stabilize.

---

## Conclusion

ExpenseWise provides a backend foundation for managing expenses, income, budgets, dashboard summaries, transaction history, and recurring financial transactions.

Its layered architecture separates HTTP handling from business logic and database operations. The recurring automation service extends the application by generating scheduled income and expense records, handling missed occurrences, respecting end dates, and preventing duplicate scheduled entries.

**Before production deployment, prioritize automated testing, security review, date and timezone validation, and scheduler coordination.**
