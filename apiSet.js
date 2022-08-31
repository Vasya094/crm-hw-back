const { default: axios } = require("axios")

let token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImYyMzZjNWM3ZGQ1NjVkZWFhNzYzMDMzODQ4ZGVhOGZiYmE5MTE4N2NkZWRiNTg3N2YxNmFiZDMyZWEwNGU1ODhjYmViYzZhMDA1NTk5Y2M4In0.eyJhdWQiOiI0ZjNmMmJkYi1mOGU3LTRjOTgtYThiNC1lYWI1ZmE5YjQ4MTgiLCJqdGkiOiJmMjM2YzVjN2RkNTY1ZGVhYTc2MzAzMzg0OGRlYThmYmJhOTExODdjZGVkYjU4NzdmMTZhYmQzMmVhMDRlNTg4Y2JlYmM2YTAwNTU5OWNjOCIsImlhdCI6MTY2MTkwMjkwMSwibmJmIjoxNjYxOTAyOTAxLCJleHAiOjE2NjE5ODkyOTgsInN1YiI6Ijg1MDE3MzEiLCJhY2NvdW50X2lkIjozMDM2NDUwMSwic2NvcGVzIjpbInB1c2hfbm90aWZpY2F0aW9ucyIsImZpbGVzIiwiY3JtIiwiZmlsZXNfZGVsZXRlIiwibm90aWZpY2F0aW9ucyJdfQ.ML41jwPufuQSlap1hzuBWiWZicocLz9F81qeLuHSvLvt2INCDD9W-XAMayzcyvGxko2TgCKdWiqQwjDIFbuFFJH0nDUQlZaqURD7xyAW4XbZCXAmzGp84zB99uIdUprcmGsTEPlzNire_hiTf6dCJYyrmfQj9tbdofKLXppZw7AvtUM7dIlJ0AldtXXh0h5CG0d6D3GxSoPzRcjiWdfpmikdlhTljgKsFGkfKIN37t4yW4Or1GbxsFdfDmIxSl9bxovQQEuaB6aZMDmA9Apw513NZVp2zbnKXygTc0KkljpeDuTh8XdsbS2udmxqaIfREk_s1PejXXFDChypQ8wG9Q"
let refresh_token =
  "def50200c822f882aeb9b8200f9b4441e112016e31caf41bb35f2e7d6e82ac0290adc34e01d629493416fb40ccef062020a2305258034fd151954b13c91b79bc1ddb06e2b8b6cdfdebf4d04d8b7a53bbc3c262fe82a97ef302698de1a6e9efa81cf8a16dec9f61c49d2dc58b2a0facc4ee939e803eaceaf335579c2fc0fdda379f38504988459b7c7986147202d4671ed6083060fd79cbab034bb50430703c982a93e191aad63914c2555172cf7a5ef4c7ea5a1381162c87287821050bada74808f87a916816899b5f24a9ddab3b460f0bd0c620a9294f47053d0265a55ca428f635a2e3f38e29ea78de3786a3f90bc8af9e4d3d6c906445b70e9112e0833874728fc258b9dd95606c0ed8331c47850e9fc64cc6f0d22682e6af627635d409cd980452578e108f1e878a24cca214885bc9da23fb31b55733e0ff43ce8a8cc39549abbc8e490d6c2147b8686f4223b9be1c4dff77e27dd65a360fe13c6786e90756680dd3bb495477bc3b44b1f20495e2ed80ff099ad842ac851d9a36728a7df849a18787aaa1b6083b6438cde1cdd0ddc9c7aff282b28185ddf31056672764a5ffb7a860c2e755dbf654453af88469076fb56e68f675f000ae8be6f33c8ab2889e8778c839fa7f987fb345d0333e812cab776a2227191bf1ca5ce18d186886acf7"

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
