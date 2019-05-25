const {gql} = require('apollo-server-express');

module.exports = gql`
    type User {
        name: String
        email: String
    }

    type Query {
        me: User
    }

    type Mutation {
        updateUser(name: String!): User
    }

`