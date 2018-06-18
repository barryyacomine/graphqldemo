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

const bookType = new GraphQLObjectType({
  name: "book",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    genre: {
      type: GraphQLString
    },
    author: {
      type: authorType,
      resolve(parent, args) {
        return testData.authors.filter(a => a.id == parent.authorId)[0];
      }
    }
  })
});

const authorType = new GraphQLObjectType({
  name: "author",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    books: {
      type: new GraphQLList(bookType),
      resolve(parent, args) {
        return testData.bookData.filter(b => b.authorId == parent.id);
      }
    }
  })
});

const typeDefs = {
  bookType: bookType,
  authorType: authorType
};

module.exports = typeDefs;
