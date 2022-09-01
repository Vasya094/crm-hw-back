const { default: axios } = require("axios")

let token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImYzYzNhMjJmYzkwOGE1M2JkNDkwNjk2YmIzOGQ5MTE4MGQxNDNiOGFmZWU5YmQzNGY2ZTNlNjY0ZTcwNmNmMGM1ZDNjZTc0NTRlODEyYzMxIn0.eyJhdWQiOiI0ZjNmMmJkYi1mOGU3LTRjOTgtYThiNC1lYWI1ZmE5YjQ4MTgiLCJqdGkiOiJmM2MzYTIyZmM5MDhhNTNiZDQ5MDY5NmJiMzhkOTExODBkMTQzYjhhZmVlOWJkMzRmNmUzZTY2NGU3MDZjZjBjNWQzY2U3NDU0ZTgxMmMzMSIsImlhdCI6MTY2MTk5MTQ4OSwibmJmIjoxNjYxOTkxNDg5LCJleHAiOjE2NjIwNzc4ODksInN1YiI6Ijg1MDE3MzEiLCJhY2NvdW50X2lkIjozMDM2NDUwMSwic2NvcGVzIjpbInB1c2hfbm90aWZpY2F0aW9ucyIsImZpbGVzIiwiY3JtIiwiZmlsZXNfZGVsZXRlIiwibm90aWZpY2F0aW9ucyJdfQ.GGma51-iT9fGOoS_16p2cJSqxLSk6_-8c9LH5HuzgvOd_1pwNrYuVHlmFK3AVbi29RMBUAVQpVYoq5OhGnPyUqwk-dOt_OdincA5YVECkabbd_HcQUkmftHYT7a_3NDMw9y3Y8_-VUX3IKEs8k7qYgYxmhcXDJRsTfitN1Rf0elc2pA1H4_xgZ_KK_erS4mLqSqwSQJfdbNg8aQgLwwrG93e4_tBZtUTqSmhSUur93Mwhg64puxb3Etl69IeB2zduv_dm4zV9pHHb_I2k8WwUG_kkh9jyVnwHrWPJiDXoKqU-vCZ0uEivfcAu81cIfdN64b20ADornOdZBrdkufHpw"
let refresh_token =
  "def5020055840308452f13a46bfa331d24a7d5908a0f93d997043c5a3616c6886a3f9e92787fdde58e283708cc0735a8ca94f3f04c2577c4761cffd0caf361171a3930104cbe6901a4ca6115819a963252b5e0579ad804e77fe1ea77563e1377a42c10b8a5691aff7c1725145dc940bbc5a3a349cfa2ff959a1c1284cb41a5a099e025118bb7b0fe0dae2fd435b74884a964850f28e79e30fe3f5cd45000c589c45b8974cba62e427a75d6bbf7f33754572966afb99e2dc5afc5d9f158deb655f5abc89363642d38e83217729c4871425a41726bd024c5d8d630cb99f2e062a8cc44b07a53817b0743626fe13ec0780bc6aa47d3637b5fe13840dba2c1b1b29da84fa2fcb3cd4ac12756525d31e1181c3057f844f233fa6b8bab4a7695dc7aa1cc85aaa7db5d71756a95ed2e328bf5c224e9381a7999f897efe4642e40e5507f112349027f08cdcd1bd2252d5607b9657145bd2594fd886ca58779958278296dc4d8bbfbe287999efa5ca27d17324c16c8be34b82f95ee0362d35f7679b50346a73eb9ecabe7af863586b638784af5d66909c2c7c552597b811ae3f1c05e67364407bbf2688dff5d51ccf8fd3cf5e9965fe335e0bb52c6eb09b254b4a1b084adc8d8eaddf5233e23a4674ec6b87d764e82e1a2019ffeacb35242960c785bfdd848"

const dataToRefresh = {
  client_id: "4f3f2bdb-f8e7-4c98-a8b4-eab5fa9b4818",
  client_secret:
    "tjjdLSwive7DpushKCDrl7PXY9WEZsszHuf5OlWt59N6lDCHlioyQpHudTAmPGbj",
  grant_type: "refresh_token",
  refresh_token,
  redirect_uri: "https://test-crm-task.herokuapp.com",
}

function setServer() {
  return axios.create({
    baseURL: "https://rinatkhabib1998.amocrm.ru",
    headers: { Authorization: `Bearer ${token}` },
  })
}
let api = setServer()

async function refreshToken() {
  try {
    const { data } = await api.post("/oauth2/access_token", dataToRefresh)
    console.log(data)
    token = data.access_token
    refresh_token = data.refresh_token
    api = setServer()
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  api,
  refreshToken,
}
