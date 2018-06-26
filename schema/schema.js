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
const httpClient = require("./httpClient");
const transformer = require("./transformer");

const rootQuery = new GraphQLObjectType({
  name: "rootQueryType",
  fields: {
    msp: {
      type: typeDefs.msp,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return httpClient.getMSPData().then(
          resp => {
            const msps = resp.data.value;
            const msp = msps.filter(m => m.Id == args.id)[0];
            return transformer.transformMSPData(msp);
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    party: {
      type: typeDefs.party,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve(parent, args) {
        return httpClient.getPartyData().then(
          resp => {
            const parties = resp.data.value;
            const party = parties.filter(m => m.Id == args.id)[0];
            return transformer.transformPartyData(party);
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    msps: {
      type: new GraphQLList(typeDefs.msp),
      resolve(parent, args) {
        return httpClient.getMSPData().then(
          resp => {
            const msps = resp.data.value;

            const result = [];
            let i = 0;
            for (i = 0; i < msps.length; i++) {
              result.push(transformer.transformMSPData(msps[i]));
            }
            return result;
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    partys: {
      type: new GraphQLList(typeDefs.party),
      resolve(parent, args) {
        return testData.partyData;
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: rootQuery });
