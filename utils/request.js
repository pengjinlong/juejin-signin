const got = require("got");
const prefixUrl = "https://api.juejin.cn";
const domain = "https://juejin.cn";

const myCookie = "_ga=GA1.2.506983935.1608436571; n_mh=-58sgpo8MdUDBpMsbmeYtqqk4v6ZH69azaKmUzL6Yag; passport_csrf_token_default=7ced659aaf66b650e86c2b8d6bd3bcb5; passport_csrf_token=7ced659aaf66b650e86c2b8d6bd3bcb5; sid_guard=cf21952b100934dccdcfb3604f10c5e8%7C1624282962%7C5183999%7CFri%2C+20-Aug-2021+13%3A42%3A41+GMT; uid_tt=fdb2e0eeac926cd5446610e04f71998b; uid_tt_ss=fdb2e0eeac926cd5446610e04f71998b; sid_tt=cf21952b100934dccdcfb3604f10c5e8; sessionid=cf21952b100934dccdcfb3604f10c5e8; sessionid_ss=cf21952b100934dccdcfb3604f10c5e8; MONITOR_WEB_ID=b647a17e-f152-4c05-a8f8-6d99ca51e796; _gid=GA1.2.1516275057.1627458969"
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
