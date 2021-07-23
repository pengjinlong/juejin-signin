const got = require("../utils/request");

// 获取签到状态
const signInStatus = () => {
  return got.get("growth_api/v1/get_today_status", {
    responseType: "json",
  });
};

// 用户签到
const signIn = (params) => {
  return got.post("growth_api/v1/check_in", {
    // json: {
    //   hello: "world",
    // },
    responseType: "json",
  });
};

// 获取当前的矿石数量
const pointTotal = () => {
  return got.get("growth_api/v1/get_cur_point", {
    responseType: "json",
  });
};

// 获取当前的矿石数量
const signInfo = () => {
  return got.get("growth_api/v1/get_counts", {
    responseType: "json",
  });
};

// 免费抽奖一次
const lotteryFree = () => {
  return got.post("growth_api/v1/lottery/draw", {
    responseType: "json",
  });
};

module.exports = {
  signIn,
  signInStatus,
  pointTotal,
  signInfo,
  lotteryFree,
};
