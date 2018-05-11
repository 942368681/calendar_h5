import Mock from 'mockjs';

Mock.setup({
    timeout: '600'
});
Mock.mock('http://data/todoList', {
    'list|8-15': [{
        'id|+1': 0, // 日程唯一标识（id）
        'dateline': '@date("2018-05-dd")', // 创建日程的日期（dateline）
        'endDate': '@date("2018-05-dd")', // 日程结束日期（endDate）
        'endTime': '@date(HH:mm)', // 日程结束具体时间（endTime）
        'startDate': '@date("2018-05-dd")', // 日程起始日期（startDate）
        'startTime': '@date(HH:mm)', // 日程起始具体时间（startTime）
        'title': '@ctitle()', // 日程内容（title）
        'creater': '@cname()', // 创建人（creater）
        'remark': '@ctitle(30)', // 日程备注内容（remark）
        'remindType': 1, // 提醒时机（remindType）
        'repeatType': 0 // 重复时间段（repeatType）
    }]
});
