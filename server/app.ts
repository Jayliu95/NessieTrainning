import { json, urlencoded } from "body-parser";
import * as compression from "compression";
import * as express from "express";
import * as path from "path";

console.log(__dirname);

let account = require('./controllers/account');
let atm = require('./controllers/atm');
let bill = require('./controllers/bill');
let customer = require('./controllers/customer');
let deposit = require('./controllers/deposit');
let data = require('./controllers/data');
let enterprise = require('./controllers/enterprise');
let purchase = require('./controllers/purchase');
let merchant = require('./controllers/merchant');

const app: express.Application = express();

app.disable("x-powered-by");

app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));

// api routes
app.use("/api/v1/accounts", account);
app.use("/api/v1/atms", atm);
app.use("/api/v1/bills", bill);
app.use("/api/v1/customers", customer);
app.use("/api/v1/deposits", deposit);
app.use("/api/v1/data", data);
app.use("/api/v1/enterprises", enterprise);
app.use("/api/v1/purchases", purchase);
app.use("/api/v1/merchants", merchant);

if (app.get("env") === "production") {

  // in production mode run application from dist folder
  app.use(express.static(path.join(__dirname, "/../client")));
}

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next) => {
  const err = new Error("Not Found");
  next(err);
});

// production error handler
// no stacktrace leaked to user
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message,
  });
});

export { app };
