const graphQL = require("graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphQL;
const _ = require("lodash");
const testData = require("./data/testData");
const typeDefs = require("./typeDefs");

const rootQuery = new GraphQLObjectType({
  name: "rootQueryType",
  fields: {
    book: {
      type: typeDefs.bookType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return _.find(testData.bookData, { id: args.id });
      }
    },
    author: {
      type: typeDefs.authorType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return _.find(testData.authors, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(typeDefs.bookType),
      resolve(parent, args) {
        return testData.bookData;
      }
    },
    authors: {
      type: new GraphQLList(typeDefs.authorType),
      resolve(parent, args) {
        return testData.authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: rootQuery });
