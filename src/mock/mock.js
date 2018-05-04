import Mock from 'mockjs';

Mock.setup({
    timeout: '600'
});

Mock.mock('http://data/todoList', {
    'list|8-15': [{
        'todoID|+1': 0, // 日程唯一标识（todoID）
        'dateline': '@date("2018-05-dd")', // 创建日程的日期（dateline）
        'startDate': '@date("2018-05-dd")', // 日程起始日期（startDate）
        'endDate': '@date("2018-05-dd")', // 日程结束日期（endDate）
        'timeStart': '@date(HH:mm)', // 日程起始具体时间（timeStart）
        'timeEnd': '@date(HH:mm)', // 日程结束具体时间（timeEnd）
        'textVal': '@ctitle()', // 日程内容（textVal）
        'creater': '@cname()', // 创建人（creater）
        'remarkVal': '@ctitle(30)', // 日程备注内容（remarkVal）
        'remind': { "value": 1, "label": "日程开始时"}, // 提醒时机（remind）
        'repeat': { "value": 0, "label": "不重复"} // 重复时间段（repeat）
    }]
});
