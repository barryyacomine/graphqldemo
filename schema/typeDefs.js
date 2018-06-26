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
const httpClient = require("./httpClient");
const transformer = require("./transformer");
const testData = require("./data/testData");

const mspType = new GraphQLObjectType({
  name: "msp",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    userAlias: {
      type: GraphQLString
    },
    constituency: {
      type: constituencyType,
      resolve(parent, args) {
        return httpClient.getConstituencyData().then(
          resp => {
            const reqData = resp.data.value;
            const constituencyData = reqData.filter(
              r => r.Id == parent.constituencyId
            );
            if (constituencyData.length > 0) {
              return transformer.transformConstituencyData(constituencyData[0]);
            }
            return null;
          },
          err => {
            console.log(err);
          }
        );
      }
    },
    party: {
      type: partyType,
      resolve(parent, args) {
        return httpClient.getPartyData().then(
          resp => {
            const parties = resp.data.value;
            const party = parties.filter(m => m.Id == parent.partyId)[0];
            return transformer.transformPartyData(party);
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  })
});

const partyType = new GraphQLObjectType({
  name: "party",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    members: {
      type: new GraphQLList(mspType),
      resolve(parent, args) {
        return httpClient.getMSPData().then(
          resp => {
            let msps = resp.data.value;
            msps = msps.filter(m => m.PartyId === parent.id);
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
    }
  })
});

const constituencyType = new GraphQLObjectType({
  name: "constituency",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    }
  })
});

const typeDefs = {
  msp: mspType,
  party: partyType,
  constituency: constituencyType
};

module.exports = typeDefs;
