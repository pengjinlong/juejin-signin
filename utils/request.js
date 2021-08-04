const got = require("got");
const prefixUrl = "https://api.juejin.cn";
const domain = "https://juejin.cn";

const myCookie =
  "_ga=GA1.2.608544271.1606361982; n_mh=-58sgpo8MdUDBpMsbmeYtqqk4v6ZH69azaKmUzL6Yag; passport_csrf_token_default=b0793f605d7a6743d3f90d339acc8e7c; passport_csrf_token=b0793f605d7a6743d3f90d339acc8e7c; passport_auth_status=270d8ccc48231468c062ce4228aaa39e%2C; passport_auth_status_ss=270d8ccc48231468c062ce4228aaa39e%2C; _tea_utm_cache_2608={%22utm_source%22:%2220210801%22%2C%22utm_medium%22:%22Push%22%2C%22utm_campaign%22:%2231day%22}; sid_guard=1dadfe89e16d7799e81d98ef588ccf3b%7C1627548416%7C5184000%7CMon%2C+27-Sep-2021+08%3A46%3A56+GMT; uid_tt=8dc1bf6b6b86acb099d910a0034bacdd; uid_tt_ss=8dc1bf6b6b86acb099d910a0034bacdd; sid_tt=1dadfe89e16d7799e81d98ef588ccf3b; sessionid=1dadfe89e16d7799e81d98ef588ccf3b; sessionid_ss=1dadfe89e16d7799e81d98ef588ccf3b; SID_UCP=1dadfe89e16d7799e81d98ef588ccf3b; SSID_UCP=1dadfe89e16d7799e81d98ef588ccf3b; MONITOR_WEB_ID=807cd224-be1e-4f91-b4fe-93f160855b7e; _gid=GA1.2.286946785.1627866585";

const instance = got.extend({
  prefixUrl,
  hooks: {
    beforeRequest: [
      async (options) => {
        options.headers.origin = domain;
        options.headers.referer = domain;
        options.headers.cookie = myCookie;
      },
    ],
  },
  responseType: "json",
  resolveBodyOnly: true,
});

module.exports = instance;
