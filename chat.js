const superagent = require("superagent");
const md5 = require("md5");

let cookies;

module.exports = async (stimulus, context = []) => {
  if (cookies == null) {
    const req = await superagent.get("https://www.cleverbot.com/");
    cookies = req.header["set-cookie"];
  }
  let payload = `stimulus=${
    escape(stimulus).includes("%u")
      ? escape(escape(stimulus).replace(/%u/g, "|"))
      : escape(stimulus)
  }&`;

  const reverseContext = context.reverse();

  for (let i = 0; i < context.length; i++) {
    payload += `vText${i + 2}=${
      escape(reverseContext[i]).includes("%u")
        ? escape(escape(reverseContext[i]).replace(/%u/g, "|"))
        : escape(reverseContext[i])
    }&`;
  }

  payload += "cb_settings_scripting=no&islearning=1&icognoid=wsf&icognocheck=";

  payload += md5(payload.substring(7, 33));

  const req = await superagent
    .post("https://www.cleverbot.com/webservicemin?uc=UseOfficialCleverbotAPI")
    .set("Cookie", cookies)
    .type("text/plain")
    .send(payload);

  return decodeURIComponent(req.header["cboutput"]);
};
