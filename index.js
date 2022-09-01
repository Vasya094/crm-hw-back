// content of index.js
const http = require("http")
const url = require("url")
const { refreshToken } = require("./apiSet")
const { getDeals } = require("./getFromApi")
const port = process.env.PORT || 5000

let timeToRefresh = false

setTimeout(() => (timeToRefresh = true), 80000)

const requestHandler = async (request, response) => {
  const queryObject = url.parse(request.url, true)
  if (request.method === "GET" && queryObject.pathname === "/api/leads") {
    try {
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Content-Type": "application/json",
        "Access-Control-Max-Age": 2592000,
      }
      const dealsWithContacts = await getDeals(queryObject.query.query)
      response.writeHead(200, headers)
      let json_response = {
        status: 200,
        message: "succssful",
        result: dealsWithContacts,
      }
      response.end(JSON.stringify(json_response))
    } catch (e) {
      response.end(JSON.stringify(e))
      if (timeToRefresh) {
        refreshToken()
        timeToRefresh = false
      }
    }
  }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err)
  }

  console.log(`server is listening on ${port}`)
})
