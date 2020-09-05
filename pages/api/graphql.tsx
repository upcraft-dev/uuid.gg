import {ApolloServer, gql} from "apollo-server-micro";
import {readFileSync} from "fs";
import {IResolvers} from "graphql-tools";
import {DocumentNode} from "graphql";

const schema = readFileSync("src/schema.graphql").toString("utf-8")
const typeDefs: DocumentNode = gql(schema)
const resolvers: IResolvers = {
    Query: {
        hello: (parent, args, context) => "Hello!"
    }
}

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: (): any => {
        return {}
    }
})

export default apolloServer.createHandler({path: "/api/graphql"})

// tell next.js that it should not parse the body
export const config = {
    api: {
        bodyParser: false,
    }
}
