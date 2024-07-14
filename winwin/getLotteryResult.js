const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');
const { getDate } = require('../tools/date')


const cookies = 'token=3da0830670b88023c1bd3cfc1c73521185102977; Domain=222.capi080.com; Path=/; HttpOnly'
const dateNum = 180
const dateArr = getDate(dateNum)
const resObj = {}
let index = 0

let timer = setInterval(() => {
    console.log(dateArr[index]);
    if (dateArr[index]) {
        const url = `https://222.capi080.com/member/dresult?lottery=11X5JSC&date=${dateArr[index]}&table=1`;

        superagent.get(url).set("Cookie", cookies).end((err, res) => {
            const $ = cheerio.load(res.text, { decodeEntities: false })
            const otherDoms = $('.other')
            const arr = []
            for (let key in otherDoms) {
                if (otherDoms[key].children && otherDoms[key].children[0]) {
                    arr.push(otherDoms[key].children[0].data)
                }
            }
            resObj[dateArr[index]] = arr.filter(item => item === '龙' || item === '虎')

            index++
        })
    }
    else {
        clearInterval(timer)
    }

}, 5000)


setTimeout(() => {
    fs.writeFile('./lotteryData.json', JSON.stringify(resObj, null, 2), (error) => {
        if (error) {
            console.log('An error has occurred ', error);
            return;
        }
        console.log('Data written successfully to disk');
    });

}, 7000 * dateNum + 5000)


