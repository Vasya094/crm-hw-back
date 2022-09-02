const { default: axios } = require("axios")

const keys = {
  token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImUwZDU3ZTIyZDM2YTNlNmMwM2I2MGU4ODdlODhjMDQ3ODk5MzAxMTc3ZmViZThiYjgzMWI4YjcxNDhjMGM5ZjJmMzlmNjljZGNhMzAwMzJkIn0.eyJhdWQiOiI0ZjNmMmJkYi1mOGU3LTRjOTgtYThiNC1lYWI1ZmE5YjQ4MTgiLCJqdGkiOiJlMGQ1N2UyMmQzNmEzZTZjMDNiNjBlODg3ZTg4YzA0Nzg5OTMwMTE3N2ZlYmU4YmI4MzFiOGI3MTQ4YzBjOWYyZjM5ZjY5Y2RjYTMwMDMyZCIsImlhdCI6MTY2MjEyODU5OCwibmJmIjoxNjYyMTI4NTk4LCJleHAiOjE2NjIyMTQ5OTgsInN1YiI6Ijg1MDE3MzEiLCJhY2NvdW50X2lkIjozMDM2NDUwMSwic2NvcGVzIjpbInB1c2hfbm90aWZpY2F0aW9ucyIsImZpbGVzIiwiY3JtIiwiZmlsZXNfZGVsZXRlIiwibm90aWZpY2F0aW9ucyJdfQ.oD_xVzYszPlzFAE2iwbaKez501LCW8ybYB1HdSoecr5c-4YEJf0yvoY28Kzf9FOqApusP3CYIqtZNcZFnSi0JhXB6Mmu9--egA1P9KnwuRvcBRVYOXzAz_UPWsRhX5oehEsp6iXPCLCUhXi5FrKT_899h9fEWySC8Jn80F0qDsZ3jQkJcc1-eJ-XvdF_wgmrV8igw9ZzHozDYAB2VA4k99W1BoDm7S5Y_txI2S6n93HtyjrWvuzXqYQ2v7m6CpcF04n5TTPNOuVTu5QmplMLxszltAeopHcBVRKYFdXNRMIG3S_-QmMpTRE-MctwRR6eBJwsM6pVrwtnuloYR9XAKQ",
  refresh_token:
    "def502003165e5645d0cccaaa4c92be09234bef3c383ba5f26811d7554da3dde146707ebfc7e91513c1dcc3e8798acd565d4b33f0903eee909e42625975f92c348758f46b20b45177b39a068762450413ef8178b5b8eba3b24a7f3886535e0abca4e6099acb7534a4813653a9db0d844aa666d4f720933d80dc192dc7d2e9eacc98ce203386fb2e7fb1c5580d63ffdc4032ac7f8ff054dcfa668fb731f50863f433859007838087d889e9d2c60ebf2bb2a1d3abfb3ff7106aa8a6b54aefe3b2c65fabac664ec49b64c87d34523fc39dd743f4a67185acf07094a733909b81d1b162414c3ad17e60e1a45f7f10444e0e82dfaa26abc203f066592602c50544b64e57a7e7b7ea4f854247bb556ddb4e8aa48498113969ee338159da33744f3c7e52f52acc21e2da6ef86a10a832def58c224e83bbcafb4233c6bc1732459ce4ae8004d6ae3a1a0fb09496eeaddcc0c1f09e07648d4c25e0d2b1959640c4f9cf56cd08d768390d17e16ffebe9be324242cb820c4917ffd20a3e8b707528b1ea48a14c4dc0eea038641b043d586af5ae2c648c5ef94a9d9cb503e1c783410b967bdae11ad80429606cb2f059db6688ab43b8432df7b411ece15017816093d1b27c3f7b5a5515c655a4d6aa597fe6df1da35f69927a2a959e96405984f0fbfec7f20b05",
}

const dataToRefresh = {
  client_id: "4f3f2bdb-f8e7-4c98-a8b4-eab5fa9b4818",
  client_secret:
    "tjjdLSwive7DpushKCDrl7PXY9WEZsszHuf5OlWt59N6lDCHlioyQpHudTAmPGbj",
  grant_type: "refresh_token",
  refresh_token: keys.refresh_token,
  redirect_uri: "https://test-crm-task.herokuapp.com",
}

let api = axios.create({
  baseURL: "https://rinatkhabib1998.amocrm.ru",
})

function setNewHeader() {
  axios.defaults.headers.common["Authorization"] = `Bearer ${keys.token}`
}

setNewHeader()

async function refreshToken() {
  try {
    const { data } = await api.post("/oauth2/access_token", dataToRefresh)
    console.log(data)
    keys.token = data.access_token
    keys.refresh_token = data.refresh_token
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  api,
  refreshToken,
  setNewHeader,
  keys,
}
