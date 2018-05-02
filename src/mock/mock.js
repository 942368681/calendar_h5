import Mock from 'mockjs';

Mock.setup({
    timeout: '600'
});

Mock.mock('http://data/todoList', {
    'list|8-15': [{
        'todoID|+1': 0,
        'dateline': '@date("2018-05-dd")',
        'startDate': '@date("2018-05-dd")',
        'endDate': '@date("2018-05-dd")',
        'timeStart': '@date(HH:mm)',
        'timeEnd': '@date(HH:mm)',
        'textVal': '@ctitle()',
        'creater': '@cname()',
        'remarkVal': '@ctitle(30)',
        'remind': { "value": 1, "label": "日程开始时"},
        'repeat': { "value": 0, "label": "不重复"}
    }]
});
