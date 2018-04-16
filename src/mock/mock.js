import Mock from 'mockjs';

Mock.setup({
    timeout: '600'
});

Mock.mock('http://data/todoList', {
    'list|2-10': [{
        'dateline': '@date("2018-04-dd")',
        'startDate': '@date("2018-04-dd HH:mm:ss")',
        'endDate': '@date("2018-04-dd HH:mm:ss")',
        'workName': '@ctitle()',
        'creater': '@cname()',
        'remark': '@ctitle(30)'
    }]
});
