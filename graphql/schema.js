const { gql } = require('apollo-server-express');

module.exports = gql`
    type User {
        id: Int!
        username: String!
        email: String!
        password: String!
    }

    type Query {
        lookUsers: [User]
    }

    type Mutation {
        signup (username: String!, email: String!, password: String!): Int
        login (email: String!, password: String!): String
    }
`;