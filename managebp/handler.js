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

module.exports = async function (event, context) {
    let msg;
    try {
        msg = JSON.parse(JSON.stringify(event.data));
    } catch (e) {
        try {
            msg = JSON.parse(event.data);
        } catch (e) {
            if (event.data) {
                msg = event.data
                console.log("msg", msg);
            } else {
                return "Looks like there is some issue with the data format. Expected data format: JSON/String";
            }
        }
    }
    console.log("msg:", msg);
    const res = await manageBP.executeOperation(msg);
    return res;
}
