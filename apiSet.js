const { default: axios } = require("axios")

let token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImEzMmY1NjM3MWQ3NGEyYzJlM2ZmZGRmYTRmNTkyYmFhMGEwMjlhOTNkMTliN2M0YWViODQ4YWU4ZjRjMjQxZDdlZTg3MTc1ODk2ZGFiZWFmIn0.eyJhdWQiOiI0ZjNmMmJkYi1mOGU3LTRjOTgtYThiNC1lYWI1ZmE5YjQ4MTgiLCJqdGkiOiJhMzJmNTYzNzFkNzRhMmMyZTNmZmRkZmE0ZjU5MmJhYTBhMDI5YTkzZDE5YjdjNGFlYjg0OGFlOGY0YzI0MWQ3ZWU4NzE3NTg5NmRhYmVhZiIsImlhdCI6MTY2MjEyNjE4OCwibmJmIjoxNjYyMTI2MTg4LCJleHAiOjE2NjIyMTI1ODgsInN1YiI6Ijg1MDE3MzEiLCJhY2NvdW50X2lkIjozMDM2NDUwMSwic2NvcGVzIjpbInB1c2hfbm90aWZpY2F0aW9ucyIsImZpbGVzIiwiY3JtIiwiZmlsZXNfZGVsZXRlIiwibm90aWZpY2F0aW9ucyJdfQ.mO5vKPnw0WCPuKstzNzf_HfM8JnCT1z5k3GpBeiM8MEIwTGCc6xDLg7mftkv467dcN29CE7yD8spTiq8H0pWLp07mNfg1lMGz9Ek_Al0n6Cynecz4vWAJf9NTA7RAHccFW7FXm_XGpq-6gXQluSg4UheVEEtgix0lc77D8npW0-CbM_9rrKRNo2_YA8pO6D0OagCSu6_MKSUsv3qwTZ6ClWQLvl6hI-FAJ2S_wDhu6LKNOfnqQYe5isGlo1XzSPM759IeybQG-tjS8EeCZb83pZQda3qf0GsNkJei8tFKv1iSVMrFxRxV3Bw1jcHLtuCqQjl9HFRwm_VeZAuZxDXYg"
let refresh_token =
  "def5020011dfa960158ddcd683d69942b9350568c1488ca8f804e7eaf2c73de050975d03d2010291ac6b4a5cf8b4b0769fd26cffa01426dd176e9e81597968e3f92ded46c2d056e246ae5958b844fc0d4ce8332ef3cc2fe6a23a3cf993cfb3a51ef2503b9e7e422ed91c29bcb5cd8eb3004a5889d51ed86390b1cc01ecff4d0d55e5d990b97fee7ff7923576a7280c5d4d5b870a85611d70c3574d5a02660c93ba8f1b3f9824c7bb103c06025f44ff59fef53131a7cab4122e4a39ec32b7e6a142a38857fae9a02b994371b8b69441abbcd3d315d0dc0d36b4d286e4eaa9aeeec1e32e5343e55a6fbf10e2bc0e547766230e7635336f5e4c8760090fd825fefe64eb37185f44c1dfc7ea3be4f7da8726d58908d7c13e239e7447a98db86d0673da02e02a6eb6059d01cff122255f6d5aa6031ecb9903398caaf583fe1c5a585a84552f877ce5031413fb7deac1d5a36629fc208226ec04de2ec0a3c35214bf4870d58780e947fec56e92960920436d2a81e556e3320c2e49fb53d0a61838d82af778f3e5a0a662c2a4536f8a6107b8e8e14088da497521d7973234701bdeb1459ea5d3166b584ef6ed8cca59c1efe722663f21eebaae50c98fa3c84cea2184625438742e613b4d4fda4ee0e810fbe0c77c013b9cc027b64c494fdc9c97a37cbb7a"

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
