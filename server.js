const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const models = require('./models');
const jwt = require('express-jwt')
require('dotenv').config()

const app = express();
const PORT = 4000;

const auth = jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false
})

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { models }
})

app.use(cors(), auth);
server.applyMiddleware({ app });

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}/graphql`);
})