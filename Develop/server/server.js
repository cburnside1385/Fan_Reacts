const express = require('express');
const path = require('path');
const db = require('./config/connection');

const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');
const app = express();
const PORT = process.env.PORT || 3000;
const { authMiddleware } = require('./utils/auth');
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    // integrate our Apollo server with the Express application as middleware
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            // log where we can go to test our GQL API
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};



// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


startApolloServer(typeDefs, resolvers);
