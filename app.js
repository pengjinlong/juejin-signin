const {
  signIn,
  signInStatus,
  pointTotal,
  signInfo,
  lotteryFree,
} = require("./api/juejin");

const sendEmail = require("./utils/nodemailer");

// 逻辑主入口
const initTask = async () => {
  sendEmail(1, false);
  return false;
  const res = await signInStatus();
  const { err_msg, data } = res.body;

  if (err_msg === "success") {
    if (!data) {
      // 没有签到，发起签到
      const params = {};
      const res1 = await signIn(params);
      if (res1.body.err_msg === "success") {
        // 签到成功,获得一次免费抽奖机会，先去抽奖
        const lotteryResult = await lotteryFree();
        if (lotteryResult.body.err_msg === "success") {
          // 抽奖成功
          sendEmail(2, lotteryResult.body.data);
        } else {
          sendEmail(2, false);
        }
        // 获取总分及签到信息
        const requests = [pointTotal, signInfo].map((fetchItem) => {
          return new Promise(async (resolve, reject) => {
            const result = await fetchItem();
            const { err_msg, data } = result.body;
            if (err_msg === "success") {
              resolve(data);
            } else {
              reject("error");
            }
          });
        });

        Promise.all(requests)
          .then(([totalPoint, signInfoData]) => {
            // 请求成功后，发送邮件通知
            const { cont_count: seriesDays, sum_count: totalDays } =
              signInfoData;
            const obj = {
              totalPoint,
              seriesDays,
              totalDays,
            };
            sendEmail(1, obj);
          })
          .catch((err) => {
            console.error(err);
            sendEmail(1, false);
          });
      }
    } else {
      console.log("今日已签到过啦");
    }
  }
};

initTask();
