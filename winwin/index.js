const fs = require("fs");
const axios = require("axios");
const moment = require("moment");
const { resolve } = require("path");
const { SEND_KEY, WIN_WIN_TOKEN } = require("../config");
const dataJSONPath = resolve(__dirname, "./data.json");

const cookies = `_skin_=blue; token=${WIN_WIN_TOKEN}`;
const sendUrl = `https://sctapi.ftqq.com/${SEND_KEY}.send`;
const mySendUrl = "http://103.143.72.25:1998/sendMsg";
const map = {
  AULUCKY10: {
    template: "PK10",
    category: "KKC",
    name: "澳洲幸运10",
    suffix: "",
  },
  AULUCKY20: {
    template: "KL8",
    category: "KKC",
    name: "澳洲幸运20",
    suffix: "",
  },
  AULUCKY5: {
    template: "SSC",
    category: "KKC",
    name: "澳洲幸运5",
    suffix: "",
  },
  AULUCKY8: {
    template: "KLSF",
    category: "KKC",
    name: "澳洲幸运8",
    suffix: "",
  },
  BJKL8: {
    template: "KL8",
    category: "KKC",
    name: "北京快乐8",
    suffix: "",
  },
  BJPK10: {
    template: "PK10",
    category: "KKC",
    name: "北京赛车(PK10)",
    suffix: "",
  },
  BJPK10BJL: {
    template: "PK10BJL",
    category: "JSC",
    name: "极速百家乐",
    suffix: "",
  },
  FTJSC: {
    template: "FT",
    category: "JSC",
    name: "极速番摊",
    suffix: "",
  },
  CQSSC: {
    template: "SSC",
    category: "SSC",
    name: "重庆时时彩",
    suffix: "",
  },
  F3D: {
    template: "3D",
    category: "QGC",
    name: "福彩3D",
    suffix: "",
  },
  GD11X5: {
    template: "11X5",
    category: "KKC",
    name: "广东11选5",
    suffix: "",
  },
  GDKLSF: {
    template: "KLSF",
    category: "KKC",
    name: "广东快乐十分",
    suffix: "",
  },
  GXK3: {
    template: "K3",
    category: "KKC",
    name: "广西快3",
    suffix: "",
  },
  GXKLSF: {
    template: "GXKLSF",
    category: "KKC",
    name: "广西快乐十分",
    suffix: "",
  },
  HK6: {
    template: "HK6",
    category: "HKC",
    name: "香港六合彩",
    suffix: "",
  },
  TWDLT: {
    template: "HK6",
    category: "HKC",
    name: "台湾大乐透",
    suffix: "",
  },
  JLK3: {
    template: "K3",
    category: "KKC",
    name: "吉林快3",
    suffix: "",
  },
  PCEGG: {
    template: "PCEGG",
    category: "KKC",
    name: "PC蛋蛋(旧)",
    suffix: "",
  },
  AUPCEGG: {
    template: "PCEGG",
    category: "KKC",
    name: "PC蛋蛋",
    suffix: "",
  },
  PK10JSC: {
    template: "PK10",
    category: "JSC",
    name: "极速赛车",
    suffix: "",
  },
  PL3: {
    template: "3D",
    category: "QGC",
    name: "体彩排列3",
    suffix: "",
  },
  SSCJSC: {
    template: "SSC",
    category: "JSC",
    name: "极速时时彩",
    suffix: "",
  },
  TJSSC: {
    template: "SSC",
    category: "SSC",
    name: "天津时时彩",
    suffix: "",
  },
  XJSSC: {
    template: "SSC",
    category: "SSC",
    name: "新疆时时彩",
    suffix: "",
  },
  TXFFC: {
    template: "SSC",
    category: "JSC",
    name: "腾讯分分彩",
    suffix: "",
  },
  XYNC: {
    template: "KLSF",
    category: "KKC",
    name: "重庆幸运农场",
    suffix: "",
  },
  LUCKYSB: {
    template: "PK10",
    category: "JSC",
    name: "极速飞艇",
    suffix: "",
  },
  HK6JSC: {
    template: "HK6",
    category: "JSC",
    name: "极速六合彩",
    suffix: "",
  },
  K3JSC: {
    template: "K3",
    category: "JSC",
    name: "极速快3",
    suffix: "",
  },
  KLSFJSC: {
    template: "KLSF",
    category: "JSC",
    name: "极速快乐十分",
    suffix: "",
  },
  KL8JSC: {
    template: "KL8",
    category: "JSC",
    name: "极速快乐8",
    suffix: "",
  },
  "11X5JSC": {
    template: "11X5",
    category: "JSC",
    name: "极速11选5",
    suffix: "",
  },
  PK10JSCNN: {
    template: "PK10JSCNN",
    category: "JSC",
    name: "极速牛牛",
    suffix: "(简约)",
  },
  PK10JSCNN_A: {
    template: "PK10JSCNN",
    category: "JSC",
    name: "极速牛牛",
    suffix: "(娱乐)",
  },
  XYFT: {
    template: "PK10",
    category: "KKC",
    name: "幸运飞艇",
    suffix: "",
  },
  SGFT: {
    template: "PK10",
    category: "KKC",
    name: "SG飞艇",
    suffix: "",
  },
  XYSSC: {
    template: "SSC",
    category: "SSC",
    name: "幸运时时彩",
    suffix: "",
  },
  CQHLSX: {
    template: "SSC",
    category: "SSC",
    name: "重庆欢乐生肖",
    suffix: "",
  },
  PL5: {
    template: "SSC",
    category: "QGC",
    name: "体彩排列5",
    suffix: "",
  },
  JSK3: {
    template: "K3",
    category: "KKC",
    name: "江苏快3",
    suffix: "",
  },
  HUBK3: {
    template: "K3",
    category: "KKC",
    name: "湖北快3",
    suffix: "",
  },
  BJK3: {
    template: "K3",
    category: "KKC",
    name: "北京快3",
    suffix: "",
  },
  HEBK3: {
    template: "K3",
    category: "KKC",
    name: "河北快3",
    suffix: "",
  },
  GSK3: {
    template: "K3",
    category: "KKC",
    name: "甘肃快3",
    suffix: "",
  },
  SHK3: {
    template: "K3",
    category: "KKC",
    name: "上海快3",
    suffix: "",
  },
  GZK3: {
    template: "K3",
    category: "KKC",
    name: "贵州快3",
    suffix: "",
  },
  SGK3: {
    template: "K3",
    category: "KKC",
    name: "SG快3",
    suffix: "",
  },
  FKL8: {
    template: "KL8",
    category: "QGC",
    name: "快乐8",
    suffix: "",
  },
  SGSSC: {
    template: "SSC",
    category: "SSC",
    name: "SG时时彩",
    suffix: "",
  },
  SGKL8: {
    template: "KL8",
    category: "KKC",
    name: "SG快乐8",
    suffix: "",
  },
  SGKLSF: {
    template: "KLSF",
    category: "KKC",
    name: "SG快乐十分",
    suffix: "",
  },
  SG11X5: {
    template: "11X5",
    category: "KKC",
    name: "SG11选5",
    suffix: "",
  },
  PCEGGJSC: {
    template: "PCEGG",
    category: "JSC",
    name: "极速蛋蛋",
    suffix: "",
  },
  TRONSSC: {
    template: "SSC",
    category: "SSC",
    name: "波场时时彩",
    suffix: "",
  },
  ETHSSC: {
    template: "SSC",
    category: "SSC",
    name: "以太时时彩",
    suffix: "",
  },
};

const writeFileAndSend = async (findObj) => {
  const sendInfo = {
    title: `${map[findObj.lottery].name}->${findObj.game}->${findObj.rank}`,
    // "title": `${findObj.lottery}----->${findObj.game}----->${findObj.rank}`,
    desp: "恭喜",
  };

  const originData = await fs.readFileSync(dataJSONPath, {
    encoding: "utf8",
    flag: "r",
  });
  const overArr = JSON.parse(originData);
  const _overArr = JSON.parse(originData);
  const info = {
    type: findObj.lottery,
    name: map[findObj.lottery].name,
    count: findObj.rank,
    game: findObj.game,
    date: moment().format("YYYY-MM-DD"),
    time: moment().format("HH:mm:ss"),
    url: "https://www.mgvip18.com/mobile2/#/pages/tabBarPages/index/index",
  };
  overArr.push(info);

  const lastData = _overArr[_overArr.length - 1] || {};
  if (
    !(
      lastData.type === findObj.lottery &&
      lastData.count === findObj.rank &&
      lastData.game === findObj.game
    )
  ) {
    axios.post(sendUrl, sendInfo);
    axios.post(mySendUrl, sendInfo);
    await fs.writeFileSync(dataJSONPath, JSON.stringify(overArr, null, 2));
    console.log(info);
  }
};

const send = () => {
  const url = `https://222.capi080.com/web/rest/member/dragon/games?count=6`;
  // Token: "eab1093da8839ee883d3ce1db408e1cb29b9472d"
  axios
    .get(url, { headers: { Cookie: cookies } })
    .then((res) => {
      if (res.status === 200) {
        const findObj = (res.data.result || []).find((item) => item.rank > 11);
        if (findObj) {
          writeFileAndSend(findObj);
        }
      }
    })
    .catch((error) => {
      const info = {
        title: `登录失效，请重新登录`,
        desp: "Error",
      };
      axios.post(sendUrl, info).then(() => {
        process.exit(1);
      });
      console.log(info);
    });
};

const runWinWin = async () => {
  send();
  setInterval(send, 30 * 1000);
  console.log("双赢彩票监听服务启动成功...");
};

module.exports = {
  runWinWin,
};
