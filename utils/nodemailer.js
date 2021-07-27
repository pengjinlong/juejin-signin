// 创建人：Michael
// 创建时间：2021/7/23
// 功能描述：发送邮件

// 引入模块 nodemailer
const nodemailer = require("nodemailer");

const senderEmail = "1539920058@qq.com";
const receiverEmail = "pengjinlong43@qq.com";

// 创建一个SMTP客户端配置
const config = {
  service: "QQ",
  secure: false,
  auth: {
    // 发件人邮箱账号
    user: senderEmail,
    //发件人邮箱的授权码 这里可以通过qq邮箱获取 并且不唯一
    pass: "sxfjguxxmlnxidec",
  },
};

// 创建一个SMTP客户端配置对象
const transporter = nodemailer.createTransport(config);

/**
 *
 * @param {number} type 类型，1:签到 2: 免费抽签
 * @param {boolean | object} params 回调内容，false代表失败
 */
const sendEmail = (type, params) => {
  let mailContent = "";
  if (type === 1) {
    if (!params) {
      mailContent = "<b>自动签到失败啦，请检查代码</b>";
    } else {
      const { totalPoint, seriesDays, totalDays } = params;
      mailContent = `<b>今日签到成功，现在累计有${totalPoint}矿石, 已经连续签到${seriesDays}天, 累计签到${totalDays}天</b>`;
    }
  } else {
    if (!params) {
      mailContent = "<b>自动抽奖失败啦，请检查代码</b>";
    } else {
      const { totalPoint, seriesDays, totalDays } = params;
      mailContent = `<b>今有${totalPoint}矿石, 已经连续签到${seriesDays}天, 累计签到${totalDays}天</b>`;
    }
  }

  const mail = {
    // 发件人 邮箱  '昵称<发件人邮箱>'
    from: `"michael"<${senderEmail}>`,
    // 主题
    subject: "掘金签到通知邮件",
    // 收件人 的邮箱 可以是其他邮箱 不一定是qq邮箱
    to: receiverEmail,
    //这里可以添加html标签
    html: mailContent,
  };

  // 发送邮件
  transporter.sendMail(mail, function (error, info) {
    if (error) {
      return console.log(error);
    }
    transporter.close();
    console.log("mail sent:", info.response);
  });
};

module.exports = sendEmail;
