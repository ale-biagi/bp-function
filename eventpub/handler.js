/**
 * @namespace Faas
 * @typedef {import("@sap/faas").Faas.Event} Faas.Event
 * @typedef {import("@sap/faas").Faas.Context} Faas.Context
 */

/**
  * @param {Faas.Event} event
  * @param {Faas.Context} context
  * @return {Promise<*>}
  */

const axios = require('axios').default;
const { HTTP, CloudEvent } = require('cloudevents');

module.exports = async function (event, context) {
  let msg;
  try {
    msg = JSON.parse(event.data);
  } catch (e) {
    if (event.data) {
      msg = event.data
    } else {
      return "Looks like there is some issue with the data format. Expected data format: JSON/String";
    }
  }

  const ce = new CloudEvent({ type: "sap.kyma.custom.nonexistingapp.businesspartner.update.v1", source: "kyma", data: msg });
  const message = HTTP.structured(ce);

  const res = axios({
    method: "post",
    url: "http://eventing-event-publisher-proxy.kyma-system/publish",
    data: message.body,
    headers: message.headers,
  });

  return res.data;
}