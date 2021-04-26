// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
    res.setHeader('Cache-Control', `public,max-age=1800`)
    var myHeaders = new Headers();
      myHeaders.append("X-CMC_PRO_API_KEY", "a80263d1-0b61-4913-9f7b-ac4ee428edc0");
      myHeaders.append("Cookie", "__cfduid=de8dbdb33c8252b9d2ecd9ee3cac0d6011618485160");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      }

      return fetch("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=10&convert=USD", requestOptions)
        .then(response => response.json())
        .then(result => res.status(200).json({
            data:result
        })).catch(err => {
            res.status(400).json({
                error:err
            })
        })
  }
  