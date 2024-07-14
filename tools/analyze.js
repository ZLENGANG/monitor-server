const obj = {}
const arr = []
Object.keys(obj).forEach(key => {
    arr.push(obj[key])
})


const resArr = []
const flatArr = arr.flat()

const investArr = [5, 11, 22, 44, 88, 178, 358]
const winArr = [4.94, 5.86, 5.73, 5.47, 4.94, 5.96, 5.7]

let _index = 0
let winMoney = 1432

flatArr.forEach((item, index) => {
    if (item === '小') {

        if (_index === 0 || (_index > 0 && _index < 7)) {
            winMoney = winMoney + winArr[_index]
            _index = 0
        }

    } else {

        _index++
    }

    if (_index === 7) {
        winMoney = winMoney - 706
        _index = 0
    }
})

console.log(winMoney);



// resArr.sort((a,b)=>b-a)

let countObj = {}
resArr.forEach(item => {
    if (!countObj[item]) {
        countObj[item] = 1
    } else {
        countObj[item]++
    }
})
// console.log(countObj);



// let condObj = {}
// flatArr.forEach(item => {
//     if (!condObj[item]) {
//         condObj[item] = 1
//     } else {
//         condObj[item]++
//     }
// })
// console.log(condObj);

