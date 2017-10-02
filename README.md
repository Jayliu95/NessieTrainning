<img width="150" src="http://api.reimaginebanking.com/img/nessie-logo.png" />

## Using Angular2+ Express Starter Template( Advanced )

- Angular 2+ ( 4.x )
- ExpressJS ( 4.x - with compression )
- Webpack ( angular-cli )

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
## Build Steps
```bash
-Make sure you have Node (6.10.3+) and npm: https://nodejs.org/en/download/package-manager/

-Install dependencies
npm install

-Make sure you have typescript
npm install typescript@'>=2.1.0 <2.4.0'

-Start app
npm start


## Documentation 
Navigation can be done using the navbar

- Uses the GET /atms endpoint. Please note it is paginated, and your submission must query ATMs multiple times using the paging object.
```bash
#Navigate to 'atms' using the navbar
#Clicking on the '>>' and '<<' will trigger paginated API calls to /atms routes
```

- Uses at least one endpoint for customers, accounts and bills, two of which must be a POST request.
```bash
#Endpoint for customers
Under Landing Page:
GET '/customers/' request is used to get all customers

#Endpoints for accounts
Under Landing Page:
GET '/accounts/' request is used to get all accounts
GET '/accounts/:id' request is used to get by ID (Search bar at the bottom of the page)
POST '/accounts/:id' request is used to create account
PUT '/accounts/:id' request is used to updated account
DELETE '/accounts/:id' request is used to updated account

#Endpoints for bills
Click into any account
GET '/accounts/:id/bills/' request is used to get all the bills for that account
POST '/accounts/:id/bills/' request is used to post a bill to tht account
```

- Uses one purchase endpoint
```bash
#Endpoints for purchases
Click into any account
GET '/accounts/:id/purchases/' request is used to get all the purchases for that account
POST '/accounts/:id/purchases/' request is used to post a purchase to tht account
```

- Uses one money movement endpoint (deposit, withdrawal, transfer) that is NOT a GET request

```bash
#Endpoints for deposits
Click into any account
GET '/accounts/:id/deposits/' request is used to get all the deposits for that account
POST '/accounts/:id/deposits/' request is used to post a deposit to tht account
```

- Uses one enterprise endpoint
```bash
#Endpoint for Enterprise Account
Navigate to 'Enterprise Accounts' on the navbar
GET '/enterprise/accounts' request is used to get all enterprise accounts
Note: Only showing 20 accounts per page. Use '>>' and '<<' to navigate
```

- Use the DELETE /data endpoint to delete a data entity(Accounts, Customers, etc) of your choice
```bash
#Endpoint for Data
Navigate to 'Data' on the navbar
DELETE '/data' request is used to delete selected type of data
```

- Include detailed instructions on how to run the project in the README.
