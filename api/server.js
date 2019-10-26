import config from './config'
const { ApolloServer, gql } = require('apollo-server')

export const start = async () => {
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `

  const resolvers = {
    Query: {
      hello: (root, args, context) => {
        return 'Hello world!'
      }
    }
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true
  })

  const { url } = await server.listen({ port: config.port })
  console.log(`GQL server ready at ${url}`)
}
