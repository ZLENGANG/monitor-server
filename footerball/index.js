const superagent = require('superagent');
const cheerio = require('cheerio');
const moment = require('moment')
const axios = require('axios')
const schedule = require('node-schedule');
const { SEND_KEY } = require('../config')

const sendUrl = `https://sctapi.ftqq.com/${SEND_KEY}.send`
let todayGameArr = []

const clubs = [
    { id: 50000529, club: '曼城' },
    { id: 50000513, club: '阿森纳' },
    { id: 50001755, club: '皇家马德里' },
    { id: 50001756, club: '巴塞罗纳' },
    { id: 50001042, club: '国际米兰' },
    { id: 50000804, club: '拜仁慕尼黑' },
    { id: 50000806, club: '勒沃库森' },
    { id: 50000731, club: '巴黎圣日耳曼' },
    { id: 50002896, club: '利雅得新月' },
    { id: 50001297, club: 'PSV埃因霍温' },
    { id: 50001298, club: '费耶诺德' },
    { id: 50001448, club: '葡萄牙体育' },
    { id: 50001447, club: '本菲卡' },
    { id: 50001446, club: '波尔图' },
    { id: 50001641, club: '凯尔特人' },
    { id: 50001642, club: '格拉斯哥流浪者' },
    { id: 50001947, club: '加拉塔萨雷' },
    { id: 50001942, club: '费内巴切' },
    { id: 50001685, club: '贝尔格莱德红星' },
    { id: 50001983, club: '顿涅茨克矿工' },
    { id: 50000414, club: '布拉格斯巴达' },
    { id: 50008172, club: '卢多戈雷茨' },
    { id: 50000111, club: '卡拉巴赫' },
    { id: 50002720, club: '柔佛新山' },
    { id: 50007190, club: '上海海港' },
    { id: 50000334, club: '上海申花' },
]

const getTodayGameData = (url) => {
    return new Promise(resolve => {
        superagent.get(url).end((_err, res) => {
            const $ = cheerio.load(res.text, { decodeEntities: false })
            const itemDom = $('.schedule .match-item')
            const arr = []

            for (let i = 0; i < itemDom.length; i++) {
                const dateArr = $(itemDom[i]).find('.date').text().split(' ')
                arr.push({
                    startDate: `${moment().format('YYYY')}-${dateArr[0]}`,
                    startTime: dateArr[1],
                    round: $(itemDom[i]).find('.round').text(),
                    teamA: $(itemDom[i]).find('.team-a').text(),
                    teamB: $(itemDom[i]).find('.team-b').text(),
                })
            }

            const findObj = arr.find(item => {
                const timeStamp = new Date(`${item.startDate} ${item.startTime}`).getTime()
                const subtract = timeStamp - new Date().getTime()
                return subtract > 0 && subtract <= 15 * 1000 * 60 * 60
            })
            if (findObj) {
                resolve(findObj)
            } else {
                resolve(null)
            }
        })
    })
}

const runFooterBall = () => {
    let rule = new schedule.RecurrenceRule();
    rule.hour = 18;
    rule.minute = 0;
    rule.second = 0;
    let job = schedule.scheduleJob(rule, () => {

        const pTodayGameArr = []
        for (let i = 0; i < clubs.length; i++) {
            const url = `https://dongqiudi.com/team/${clubs[i].id}.html`
            pTodayGameArr.push(getTodayGameData(url))
        }

        Promise.all(pTodayGameArr).then(res => {
            todayGameArr = res.filter(item => item).sort((a, b) => {
                return new Date(`${a.startDate} ${a.startTime}`).getTime() - new Date(`${b.startDate} ${b.startTime}`).getTime()
            })

            let str = ''
            todayGameArr.forEach(item => {
                str += `
                ${item.startDate} ${item.startTime}
                ${item.round}
                ${item.teamA} VS ${item.teamB}
                `
            })

            const info = {
                "title": `今日比赛`,
                "desp": str
            }

            axios.post(sendUrl, info)
            console.log(info);

        })
    });

    console.log('今日足球比赛定时任务启动成功...');
}

module.exports = { runFooterBall }
