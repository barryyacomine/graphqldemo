
transformMSPData = (input) => {
  if (input == null) {
    return null;
  }

  //console.log(input);
  const msp = {
    id: input.Id,
    name: `${input.GivenName} ${input.FamilyName}`,
    partyId: input.PartyId,
    userAlias: input.UserAlias,
    constituencyId: input.ConstituencyId
  }
  return msp;
}

transformPartyData = (input) => {
  if (input == null) {
    return null;
  }

  const party = {
    id: input.Id,
    name: input.PreferredName
  }
  return party;
}

transformConstituencyData = (input) => {
  if (input == null) {
    return null;
  }

  const constituency = {
    id: input.Id,
    name: input.Name
  }
  return constituency;
}

const transformer = {
  transformMSPData: transformMSPData,
  transformPartyData: transformPartyData,
  transformConstituencyData: transformConstituencyData
}

module.exports = transformer;