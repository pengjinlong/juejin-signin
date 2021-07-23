const got = require("got");
const prefixUrl = "https://api.juejin.cn";
const domain = "https://juejin.cn";

const myCookie =
  "_ga=GA1.2.608544271.1606361982; n_mh=-58sgpo8MdUDBpMsbmeYtqqk4v6ZH69azaKmUzL6Yag; _tea_utm_cache_2608={%22utm_source%22:%2220210528%22%2C%22utm_medium%22:%22Ccenter%22%2C%22utm_campaign%22:%2230day%22}; passport_csrf_token_default=b0793f605d7a6743d3f90d339acc8e7c; passport_csrf_token=b0793f605d7a6743d3f90d339acc8e7c; passport_auth_status=270d8ccc48231468c062ce4228aaa39e%2C; passport_auth_status_ss=270d8ccc48231468c062ce4228aaa39e%2C; sid_guard=d690bf2e748f2c15282eb7e27595a32d%7C1626161485%7C5184000%7CSat%2C+11-Sep-2021+07%3A31%3A25+GMT; uid_tt=d94abaa34c5807d5319de1a536b37b94; uid_tt_ss=d94abaa34c5807d5319de1a536b37b94; sid_tt=d690bf2e748f2c15282eb7e27595a32d; sessionid=d690bf2e748f2c15282eb7e27595a32d; sessionid_ss=d690bf2e748f2c15282eb7e27595a32d; MONITOR_WEB_ID=807cd224-be1e-4f91-b4fe-93f160855b7e; _gid=GA1.2.645424381.1626657714";

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
});

module.exports = instance;
