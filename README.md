ExpenseWise — Expense Management System
ExpenseWise is a MERN-stack expense-management project focused on backend development with Node.js, Express, MongoDB, and Mongoose. It provides authenticated expense and income management, budgets, dashboard summaries, a unified transaction history, recurring transaction rules, and scheduled recurring transaction automation.
Project status: The backend API modules and recurring automation scheduler have been implemented and manually tested during development. This README documents the current backend design and the test results reported during development. It is not a substitute for running the tests against the current codebase.

Table of Contents
- Features
- Technology Stack
- Backend Structure
- Request Flows
- Getting Started
- Environment Variables
- Authentication
- API Overview
- Expense Management
- Income Management
- Dashboard
- Budget Management
- Transaction History
- Recurring Transactions
- Recurring Automation and Scheduler
- Validation and Error Handling
- Security and Data Integrity
- Testing Status
- Known Limitations and Future Improvements
Features
Authentication and users
- User registration and login.
- Password hashing and password comparison using bcrypt.
- JWT-based authentication for protected routes.
- User roles and active-account status in the user model.
Expense management
- Create, list, retrieve, update, and delete expenses.
- Expense categories and optional descriptions.
- Date validation, pagination, and category filtering.
- User-scoped expense queries.
Income management
- Create, list, retrieve, update, and delete income records.
- Validated income sources, amounts, and dates.
- User-scoped income queries.
Dashboard
- Total spending and expense count.
- Spending and expense counts grouped by category.
- Up to five recent expenses.
- Optional date-range filtering.
Budgets
- Create and manage monthly category budgets.
- Compare actual spending with budgets for a selected month.
- Calculate remaining budget, usage percentage, and budget status.
Transaction history
- Read-only unified transaction history built from the existing Income and Expense collections.
- Filter by all transactions, income, or expenses.
- Pagination and newest-created-first ordering.
Recurring transactions
- Create and manage recurring income or expense rules.
- Daily, weekly, monthly, and yearly frequencies.
- Pause rules without deleting them.
- Generate due transactions through an automation service and scheduled job.
- Catch up missed occurrences, respect end dates, and prevent duplicate scheduled records.
Technology Stack
- Runtime: Node.js
- Package manager: npm
- Backend framework: Express 5
- Database: MongoDB
- ODM: Mongoose
- Authentication: JSON Web Token (JWT)
- Password hashing: bcrypt
- Scheduled jobs: node-cron
- Security middleware: Helmet
- Cross-origin requests: CORS
- HTTP logging: Morgan
- Development tool: Nodemon
- API testing: Postman or Hoppscotch
- Database inspection: MongoDB Compass
Backend Structure
The backend uses a layered structure. The current project folder names include middileware (spelled this way in the project), so use the actual folder names when importing files.
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
└── .env                 # Local only; do not commit
This is a representative structure based on the project files reviewed during development. Other route, controller, model, and utility files are omitted from the tree for readability.
Request Flows
Protected API request
Client
  → Route
  → Authentication middleware
  → Controller
  → Service
  → Model
  → MongoDB
  → Controller response
  → Client
Recurring automation
node-cron scheduler
  → Recurring automation service
  → RecurringTransaction model
  → MongoDB (find due rules)
  → Income or Expense service
  → Income or Expense model
  → MongoDB (create transaction)
  → Advance the recurring rule's nextDueDate
The scheduler triggers the automation service; it does not contain the transaction-generation business logic itself.
Getting Started
Prerequisites
Install:
- Node.js and npm.
- MongoDB, running locally or accessible through a MongoDB connection URI.
- An API client such as Postman or Hoppscotch (for manual testing).
Install dependencies
From the backend directory:
npm install
The project uses node-cron for recurring automation scheduling.
Configure environment variables
Create a .env file inside the backend directory. The application must use the same variable names that its code reads.
Example configuration:
PORT=5000
MONGO_URL=mongodb://127.0.0.1:27017/Expenses_Management_System
Add the JWT secret variable used by the project's token utility. Its exact name must match the name read by the code; do not assume a placeholder variable name is correct without checking the token utility.
Security: Never commit .env, real credentials, JWTs, or private connection strings to source control. Ensure .env is listed in .gitignore.
Start the backend
The current package.json does not define start or dev scripts. From the backend directory, start the server with:
node server.js
The application connects to MongoDB before starting Express and the recurring scheduler. The default development URL is:
http://localhost:5000
To stop the server, press Ctrl+C in the terminal.
Environment Variables
Variable	Purpose	Example
PORT	Port used by Express	5000
MONGO_URL	MongoDB connection URI	mongodb://127.0.0.1:27017/Expenses_Management_System
JWT secret variable	Signs and verifies authentication tokens	Set privately; use the exact name expected by the token utility


Authentication
Protected endpoints expect a JWT in the Authorization header:
Authorization: Bearer <your_jwt_token>
Use the token returned by the login endpoint. The authentication middleware validates the token and makes the authenticated identity available to request handlers as req.user. User-owned records should be queried using req.user.userId, not a client-supplied userId.
API Overview
All endpoint paths below assume server.js mounts the route modules at /api. Confirm exact paths and methods in the current route files if you change the API.
Feature	Method	Endpoint	Authentication
Register	POST	Defined in user routes	Usually public
Login	POST	Defined in user routes	Public
Expenses	GET, POST	/api/expenses	Required
One expense	GET, PUT/PATCH, DELETE	/api/expenses/:id	Required
Dashboard	GET	/api/dashboard	Required
Income	GET, POST	/api/income	Required
One income	GET, PUT/PATCH, DELETE	/api/income/:id	Required
Budgets	GET, POST	Confirm budget route file	Required
Budget comparison	GET	/api/budget/compare?month=YYYY-MM	Required
Transactions	GET	/api/transactions	Required
Recurring rules	GET, POST	/api/recurring-transactions	Required
One recurring rule	GET, PATCH, DELETE	/api/recurring-transactions/:id	Required


Endpoint note: The expense, income, budget, and authentication route paths should be checked against their route files before treating this table as a formal API contract. The recurring transaction and transaction-history paths above reflect the documented routes from development.

Expense Management
Expenses contain a user reference, amount, category, optional description, date, and Mongoose timestamps. Recurring-generated expenses also store recurringRuleId and scheduledOccurrenceDate so each scheduled occurrence can be traced to its rule.
The project's expense categories are:
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
Expense endpoints support user-scoped CRUD operations. The list endpoint supports pagination, with a default page and limit and a maximum limit of 100, as implemented in the service.
Example list request:
GET /api/expenses?page=1&limit=10
Authorization: Bearer <your_jwt_token>
Use the exact request body and update method supported by the current expense route and controller.
Income Management
Income records contain a user reference, amount, source, optional description, date, and Mongoose timestamps. Recurring-generated income records also store recurringRuleId and scheduledOccurrenceDate.
Allowed income sources:
- Salary
- Freelance
- Business
- Investment
- Scholarship
- Gift
Income endpoints support user-scoped CRUD operations. Amounts must be valid and at least 1, and the source must be one of the allowed values.
Dashboard
The dashboard endpoint is:
GET /api/dashboard
Authorization: Bearer <your_jwt_token>
The dashboard provides spending totals, expense counts, category-level summaries, and up to five recent expenses. Optional from and to query parameters can be used for date filtering when supported by the controller.
Example:
GET /api/dashboard?from=2026-10-01&to=2026-10-31
Authorization: Bearer <your_jwt_token>
Validate the response against the exact date-boundary behavior in the current dashboard service. Invalid dates and reversed ranges should be tested through the API client.
Budget Management
Budgets are associated with a user, category, monthly period, and limit. Month values use the YYYY-MM format, such as 2026-10. Budget upsert behavior matches the authenticated user, category, and month.
The budget comparison endpoint accepts a month:
GET /api/budget/compare?month=2026-10
Authorization: Bearer <your_jwt_token>
The comparison groups expense totals by category and reports values such as:
- actualSpending
- remainingBudget
- budget usage percentage
- total expenses
- status: within_budget, near_limit, or exceeded
Status rules in the implemented service:
- More than 100% used: exceeded
- At least 90% and up to 100% used: near_limit
- Below 90% used: within_budget
A comparison should be checked against the actual route/controller response shape if the API response format changes.
Transaction History
The read-only transaction-history endpoint is:
GET /api/transactions
Authorization: Bearer <your_jwt_token>
Supported query parameters:
- page: positive integer; defaults to 1.
- limit: positive integer; defaults to 10, maximum 100.
- type: all, income, or expenses.
Examples:
GET /api/transactions?page=1&limit=10&type=all
GET /api/transactions?page=1&limit=10&type=income
GET /api/transactions?page=1&limit=10&type=expenses
The API reuses the existing Income and Expense collections rather than creating a separate transaction collection. For type=all, the service combines the authenticated user's income and expense records, adds a transaction-type indicator, sorts by createdAt descending, and paginates the combined results. Loading all matching records into application memory for the combined view may become inefficient with large histories.
Recurring Transactions
Recurring transaction rules describe future income or expenses. A rule is not itself an income or expense record; the automation service creates an actual record when an occurrence becomes due.
Endpoints
Method	Endpoint	Purpose
POST	/api/recurring-transactions	Create a recurring rule
GET	/api/recurring-transactions	List the authenticated user's rules
GET	/api/recurring-transactions/:id	Get one rule
PATCH	/api/recurring-transactions/:id	Partially update a rule
DELETE	/api/recurring-transactions/:id	Delete a rule


All recurring transaction routes are protected by authentication. The user ID comes from req.user.userId.
Rule fields
Field	Description
userId	Owning user; set from authenticated identity
amount	Positive amount
type	income or expense
category	Income source or expense category, depending on type
description	Optional description
frequency	daily, weekly, monthly, or yearly
startDate	Start date
nextDueDate	Next occurrence date to process
endDate	Optional final date for the rule
isActive	true while enabled; false to pause
isMonthEnd	Supports month-end behavior for monthly rules
createdAt, updatedAt	Mongoose timestamps


For income rules, valid source values are Salary, Freelance, Business, Investment, Scholarship, and Gift. For expense rules, use the expense categories listed above.
Example recurring income rule:
POST /api/recurring-transactions
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
{
  "amount": 75000,
  "type": "income",
  "category": "Salary",
  "description": "Monthly salary",
  "frequency": "monthly",
  "startDate": "2026-09-01",
  "nextDueDate": "2026-10-01"
}
Use the field names and date rules enforced by the current schema and service. A paused rule (isActive: false) is retained but not processed. Deleting a rule does not automatically delete historical income or expense records already created from it.
Recurring Automation and Scheduler
Components
- services/recurringTransactionAutomationService.js contains the recurring-processing logic.
- services/recurringTransactionScheduler.js defines the scheduled job using node-cron.
- server.js starts the scheduler after await database() succeeds.
Execution flow
Server starts
  → MongoDB connection succeeds
  → Scheduler starts
  → Scheduled task triggers once per minute
  → Automation service finds active, due rules
  → Each due occurrence creates an Income or Expense record
  → Rule nextDueDate advances
The current cron expression is:
"* * * * *"
This means the job runs every minute. It is useful for development and quick verification. For deployment, choose a schedule appropriate to the product and hosting environment.
Automation behavior tested during development
- Due rules: Processes active rules whose start and next-due dates are eligible.
- Catch-up: Processes multiple missed occurrences in sequence until the next due date is in the future or the rule reaches its end.
- Duplicate prevention: Income and Expense documents use a unique partial compound index on recurringRuleId and scheduledOccurrenceDate for recurring-generated records.
- End dates: A rule is deactivated when its next occurrence is beyond its configured end date.
- Paused rules: Rules with isActive: false are not processed.
- Failure isolation: A failure processing one rule is logged without preventing other due rules from being processed.
- Date advancement: After an occurrence is handled, the rule's nextDueDate is advanced according to its frequency.
Scheduler logs
When the server starts, expected startup messages include:
database connected successfully
Server is running on 5000 port
On a scheduled run, logs should resemble:
Recurring automation started...
Due recurring rules found: 0
Recurring automation completed.
The due-rule count can be greater than zero. A count of zero means there were no eligible rules during that run; it is not an error.
Operational notes
- Keep the server process running for the in-process scheduler to run.
- If the process is stopped or the machine is offline, the scheduler does not execute during that downtime. Catch-up logic can process missed occurrences when the service runs again, provided the rules remain eligible.
- Avoid running multiple application instances with the same in-process scheduler unless coordinated execution is implemented. Multiple instances can attempt to process the same rules concurrently; the unique indexes help prevent duplicate records, but they do not replace a distributed scheduling/locking strategy.
- Review timezone and date-boundary behavior before production deployment.
- Keep test rules and generated test transactions separate from real financial records.
Validation and Error Handling
The backend uses route/controller/service separation and centralized error handling through the configured error middleware. Expected validation areas include:
- Missing required fields.
- Invalid amounts, categories, sources, or frequency values.
- Invalid MongoDB IDs.
- Invalid dates and incompatible date ranges.
- Unsupported pagination parameters.
- Missing or invalid authentication tokens.
- Attempts to access another user's records.
For API testing, verify both the HTTP status code and the response body. Exact error messages depend on the route, service, schema, and shared error middleware.
Security and Data Integrity
- Store passwords as bcrypt hashes, never as plaintext.
- Keep JWT signing secrets in environment variables.
- Protect user-specific routes with authentication middleware.
- Derive ownership from the verified JWT (req.user.userId).
- Scope database queries for user-owned records to the authenticated user.
- Do not commit .env files, passwords, tokens, or production connection strings.
- Use Mongoose validators for supported updates.
- Use the recurring transaction unique indexes to prevent duplicate scheduled occurrences.
- Back up the database before manually deleting test or financial records.
Testing Status
The following recurring automation behaviors were manually tested during development:
- [x] Create a due recurring expense and advance nextDueDate.
- [x] Create a due recurring income and advance nextDueDate.
- [x] Verify duplicate prevention for the same recurring rule and scheduled occurrence date.
- [x] Catch up multiple missed daily occurrences.
- [x] Deactivate a rule when its next occurrence is after endDate.
- [x] Skip paused recurring rules.
- [x] Confirm one rule's processing error does not prevent another due rule from being processed.
- [x] Start the server, connect to MongoDB, and observe the scheduler run every minute.
Other module tests have been performed manually with Postman/Hoppscotch and MongoDB Compass during development. This checklist records reported manual verification; it does not claim that a complete automated integration test suite exists.
Known Limitations and Future Improvements
Recommended follow-up work:
1. Add a formal npm start and development script to package.json.
2. Add automated integration tests for authentication, expenses, income, budgets, dashboard, transaction history, and recurring automation.
3. Review timezone consistency and monthly/yearly date edge cases.
4. Prevent overlapping scheduler executions and add a distributed lock if multiple backend instances are deployed.
5. Add graceful shutdown handling for the scheduler and MongoDB connection.
6. Review dependency security findings with npm audit; do not blindly apply breaking upgrades.
7. Optimize combined transaction-history sorting and pagination for large datasets.
8. Confirm all API paths and environment-variable names against the current source before publishing this README.
9. Add API documentation tooling, such as OpenAPI/Swagger, when the route contracts stabilize.
