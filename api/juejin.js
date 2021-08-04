const got = require("../utils/request");

// 获取签到状态
const signInStatus = () => {
  return got.get("growth_api/v1/get_today_status");
};

// 用户签到
const signIn = (params) => {
  return got.post("growth_api/v1/check_in");
};

// 获取当前的矿石数量
const pointTotal = () => {
  return got.get("growth_api/v1/get_cur_point");
};

// 获取当前的矿石数量
const signInfo = () => {
  return got.get("growth_api/v1/get_counts");
};

// 免费抽奖一次
const lotteryFree = () => {
  return got.post("growth_api/v1/lottery/draw");
};

module.exports = {
  signIn,
  signInStatus,
  pointTotal,
  signInfo,
  lotteryFree,
};
