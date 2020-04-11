const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress } = require('apollo-server-express');
const schema = require('./graphql/schema');

const app = express();
const PORT = 4000;

// GraphQL endpoint
app.use('/graphql', bodyParser.json(), 
    graphqlExpress({ 
        schema
    })
)

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}/graphql`);
})