const express = require("express");
const { ApolloServer } = require("@apollo/server");
const cors = require("cors");
const { expressMiddleware } = require("@apollo/server/express4");
const typeDefs = require("./GQLSchema/typeDefs");
const resolvers = require("./GQLSchema/resolvers")

const port = process.env.PORT || 5000;


async function startServer() {
    const app = express();

    const server = new ApolloServer({typeDefs, resolvers});
    await server.start();

    app.use('/graphql', cors(), express.json(), expressMiddleware(server));
    app.listen(port, ()=> {
        console.log(`Apollo server started at port http://localhost:${port}/graphql`);
    });

    app.get('/', (req,res)=> {
        res.send("API working");
    });
}

startServer();