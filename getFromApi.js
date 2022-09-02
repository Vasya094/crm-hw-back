const { api, keys } = require("./apiSet")

let statusesInfoArray = []
let contactsInfoList = []
let responsesInfoList = []

async function getDeals(query) {
  const resultArray = []
  const { data } = await api.get(
    `/api/v4/leads?with=contacts&query=${query || ""}`,
    { headers: { Authorization: `Bearer ${keys.token}` } }
  )
  if (data._embedded && data._embedded.leads && data._embedded.leads.length) {
    for (const [i, value] of data._embedded.leads.entries()) {
      try {
        const resultDealInfo = {}
        resultDealInfo.id = value.id
        resultDealInfo.name = value.name
        resultDealInfo.created_at = value.created_at
        resultDealInfo.price = value.price
        resultDealInfo.contactsInfo = []

        if (i === 0) {
          const [{ data: statusesInfo }, { data: listOfContacts }] =
            await Promise.all([
              api.get(`/api/v4/leads/pipelines/${value.pipeline_id}`, {
                headers: { Authorization: `Bearer ${keys.token}` },
              }),
              api.get("api/v4/contacts", {
                headers: { Authorization: `Bearer ${keys.token}` },
              }),
            ])
          statusesInfoArray = statusesInfo._embedded.statuses
          contactsInfoList = listOfContacts._embedded.contacts
        }
        const findStatus = statusesInfoArray.find(
          (st) => st.id === value.status_id
        )
        resultDealInfo.statusInfo = {
          id: findStatus.id,
          color: findStatus.color,
          name: findStatus.name,
        }

        const findResponseUser = responsesInfoList.find(
          (usr) => usr.id === value.responsible_user_id
        )
        if (findResponseUser) {
          resultDealInfo.responsibleUserName = findResponseUser.name
        } else {
          const { data: responsibleUser } = await api.get(
            `/api/v4/users/${value.responsible_user_id}`,
            { headers: { Authorization: `Bearer ${keys.token}` } }
          )
          resultDealInfo.responsibleUserName = responsibleUser.name
        }

        if (
          value._embedded &&
          value._embedded.contacts &&
          value._embedded.contacts.length
        ) {
          resultDealInfo.contactsInfo = getContactsInfo(
            value._embedded.contacts
          )
        }
        resultArray.push(resultDealInfo)
      } catch (e) {
        console.log(e)
      }
    }
  }
  return resultArray
}

function getContactsInfo(conts) {
  const resContacts = []
  for (const contact of conts) {
    try {
      const findContact = contactsInfoList.find((st) => st.id === contact.id)
      const contactInfoToClient = {
        id: findContact.id,
        name: `${findContact.first_name} ${findContact.last_name}`,
        contactWays: [],
      }
      if (
        findContact.custom_fields_values &&
        findContact.custom_fields_values.length
      ) {
        findContact.custom_fields_values.forEach((itm) => {
          contactInfoToClient.contactWays.push({
            id: itm.field_id,
            field_code: itm.field_code,
            value: itm.values[0].value,
          })
        })
      }
      resContacts.push(contactInfoToClient)
    } catch (e) {
      console.log(e)
    }
  }
  return resContacts
}

module.exports = { getDeals }
