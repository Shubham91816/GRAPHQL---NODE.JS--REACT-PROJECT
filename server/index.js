const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const{TODOS}= require('./todo')
const{USERS}= require('./user')



async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
        type Todo {
            id: ID!
            title: String!
            completed: Boolean
        }

        type User {
          id: ID!
          name: String!
          username: String!
          email: String!
          phone: String!
          website: String!
      }

      type Query {
            getTodos: [Todo]
            getAllUsers: [User]
            
            
        }
     `,
    resolvers: {
        Query: {
          getTodos:  async () => TODOS,
          getAllUsers: () => USERS,
        },
      }
  });

  app.use(bodyParser.json());
  app.use(cors());
  await server.start();
  app.use("/graphql", expressMiddleware(server));
  app.listen(8000, () => console.log("Serevr Started at PORT 8000"));
}

startServer();
