// set express js
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const authRoute = require("../routes/auth");
const graphqlSchema = require("../graphql/schema");
const graphqlResolver = require("../graphql/resolver");

// initialize express and set port
const app = express();
const port = process.env.API_PORT;
app.listen(port, () => console.log(`API Server is listening on port ${port}!`));

app.use(authRoute);
// import env  - keep in mind to comment dev_api.sh scripts to prevent overwrite in docket images while debugging
require("dotenv").config();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: "true" === process.env.GRAPHQL_IQ,
  })
);
