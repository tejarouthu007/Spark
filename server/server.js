const express = require("express");
const { ApolloServer } = require("@apollo/server");
const cors = require("cors");
const { expressMiddleware } = require("@apollo/server/express4");

const port = process.env.PORT || 5000;

async function startServer() {
    const app = express();

    const typeDefs = `
        type Query {
            message: String
        }
    `;
    const resolvers = {
        Query: {
            message: ()=> "Hello There!"
        },
    }

    const server = new ApolloServer({typeDefs, resolvers});
    await server.start();

    app.use('/graphql', cors(), express.json(), expressMiddleware(server));
    app.listen(port, ()=> {
        console.log(`Apollo server started at port http://localhost:${port}/graphql`);
    });
}

startServer();