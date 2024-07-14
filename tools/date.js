const getDate = (num) => {
    let dateArray = []
    //获取今天日期
    let myDate = new Date()
    let today = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + "-" + myDate.getDate();
    myDate.setDate(myDate.getDate() - num)
    let dateTemp;  // 临时日期数据
    let flag = 1;
    for (let i = 0; i < num; i++) {
        dateTemp = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + "-" + myDate.getDate()
        dateArray.push({
            date: dateTemp
        })
        myDate.setDate(myDate.getDate() + flag);
    }
    dateArray.push({
        date: today
    })
    let arr = []
    let newArr = []
    dateArray.forEach(item => {
        arr.push(item.date.split('-'))
    })
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][1] < 10) {
            arr[i][1] = "0" + arr[i][1]
        }
        if (arr[i][2] < 10) {
            arr[i][2] = "0" + arr[i][2]
        }
    }
    for (let j = 0; j < arr.length; j++) {
        newArr.push(arr[j].join("-"))
    }
    // 当前日期
    let nowDate = newArr[newArr.length - 1]
    // 30天前日期 
    let previousDate = newArr[0]
    // 日期区间数组
    // console.log(nowDate)
    // console.log(previousDate)
    // console.log(newArr)
    return newArr
}

module.exports = {
    getDate
}
