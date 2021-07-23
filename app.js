const Koa = require("koa");
const schedule = require("node-schedule");
const {
  signIn,
  signInStatus,
  pointTotal,
  signInfo,
  lotteryFree,
} = require("./api/juejin");
const sendEmail = require("./utils/nodemailer");
const app = new Koa();

// 创建定时任务
const createScheduleJob = (immediate) => {
  let job = {};

  const [seconds, minutes, hours] = [
    randomNumber(59),
    randomNumber(59),
    randomNumber(23),
  ];

  const rule = `${seconds} ${minutes} ${hours} * * *`;

  if (immediate) {
    initTask();
  }

  job = schedule.scheduleJob(rule, async () => {
    if (job.cancel) {
      job.cancel();
      job = {};
    }
    createScheduleJob();
    initTask();
  });
};

// 创建随机数
const randomNumber = (range) => {
  const val = (Math.random() * range).toFixed(0);
  return Number(val);
};

// 逻辑主入口
const initTask = async () => {
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
          // 抽奖完成，发送
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
            sendEmail(obj);
          })
          .catch((err) => {
            console.error(err);
            sendEmail(false);
          });
      }
    } else {
      console.log("今日已签到过啦");
    }
  }
};

createScheduleJob(true);

app.listen(3001, () => {
  console.log("listen: localhost://3001");
});
