/**
 * @namespace Faas
 * @typedef {import("@sap/faas").Faas.Event} Faas.Event
 * @typedef {import("@sap/faas").Faas.Context} Faas.Context
 */

const manageBP = require('./manage-bp.js');

/**
  * @param {Faas.Event} event
  * @param {Faas.Context} context
  * @return {Promise<*>}
  */

const axios = require('axios').default;
const { HTTP, CloudEvent } = require('cloudevents');

module.exports = async function (event, context) {
    const ce = new CloudEvent({ type: "sap.kyma.custom.nonexistingapp.businesspartner.update.v1", source: "kyma", data: event.data });
    const message = HTTP.structured(ce);

    const res = axios({
      method: "post",
      url: "http://eventing-event-publisher-proxy.kyma-system/publish",
      data: message.body,
      headers: message.headers,
    });

    return res.data;
}
