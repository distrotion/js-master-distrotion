const axios = require('axios')

exports.post =  async (url,body) => {
    
    await axios.post( url, body).then(async res => {
    // console.log(`statusCode: ${res.status}`)
    // console.log(res)
    // console.log(res.data);
    output =  res.data  
  })
  .catch(async error => {
    console.error(error.response.status)
    output = await error.response.status
    // outputr = `err`
  })

  return output;
     
};

exports.get =  async (url) => {
    
    await axios.get(url).then(async res => {
    // console.log(`statusCode: ${res.status}`)
    // console.log(res)
    // console.log(res.data);
    output =  res.data  
  })
  .catch(async error => {
    console.error(error.response.status)
    output = await error.response.status
    // outputr = `err`
  })

  return output;
     
};
