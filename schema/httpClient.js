const axios = require('axios');


getMSPData = () => {
  const url = 'https://commondatatest.table.core.windows.net/msp?sv=2017-11-09&ss=t&srt=sco&sp=rl&se=2028-06-22T15:44:27Z&st=2018-06-20T07:44:27Z&spr=https&sig=0aQGZSrlisM8f7Msfwx8LMvA4dnKhzUpQT6JMe87Iqo%3D';
  return axios.get(url);
}

getPartyData = () => {
  const url = 'https://commondatatest.table.core.windows.net/party?sv=2017-11-09&ss=t&srt=sco&sp=rl&se=2028-06-22T15:44:27Z&st=2018-06-20T07:44:27Z&spr=https&sig=0aQGZSrlisM8f7Msfwx8LMvA4dnKhzUpQT6JMe87Iqo%3D';
  return axios.get(url);
}

getConstituencyData = () => {
  const url = 'https://commondatatest.table.core.windows.net/constituency?sv=2017-11-09&ss=t&srt=sco&sp=rl&se=2028-06-22T15:44:27Z&st=2018-06-20T07:44:27Z&spr=https&sig=0aQGZSrlisM8f7Msfwx8LMvA4dnKhzUpQT6JMe87Iqo%3D';
  return axios.get(url);
}

const httpClient = {
  getMSPData: getMSPData,
  getPartyData: getPartyData,
  getConstituencyData: getConstituencyData
};

module.exports = httpClient;