
const fetchAPI = require('node-fetch')

module.exports.getFetchData = async (req, res) => {
   
      try {
            const response = await fetchAPI('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin')
            const data = await response.json()
            res.status(200).json(data)
      } catch (error) {
           return res.status(400).json("Invalid credentials!");   
        }

}
