import Mock from 'mockjs';

Mock.setup({
    timeout: '600'
});

Mock.mock('http://data/todoList', {
    'list|8-15': [{
        'todoID|+1': 0,
        'dateline': '@date("2018-04-dd")',
        'startDate': '@date("2018-04-dd")',
        'endDate': '@date("2018-04-dd")',
        'timeStart': '@date(HH:mm)',
        'timeEnd': '@date(HH:mm)',
        'textVal': '@ctitle()',
        'creater': '@cname()',
        'remarkVal': '@ctitle(30)',
        'remind': "日程开始时",
        'repeat': "不重复"
    }]
});
