"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = void 0;

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  ApolloServer,
  gql
} = require('apollo-server');

const start = async () => {
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `;
  const resolvers = {
    Query: {
      hello: (root, args, context) => {
        return 'Hello world!';
      }
    }
  };
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true
  });
  const {
    url
  } = await server.listen({
    port: _config.default.port
  });
  console.log(`GQL server ready at ${url}`);
};

exports.start = start;