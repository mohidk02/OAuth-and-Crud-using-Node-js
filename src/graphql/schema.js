const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type User {
    id: ID!
    name: String!
    email: String!
    password: String
}
input UserInputData {
    email: String!
    name: String!
    password: String!
}
type RootMutation {
    createUser(userInput: UserInputData): User!
}
type user {
    userid : Int!
    name: String!
    login: String!
    pass: String!
}
type userData {
    usersData: [user!]!
}
type RootQuery{
   users: userData
}
schema {
    mutation: RootMutation
    query: RootQuery
}
`);
