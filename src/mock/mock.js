import Mock from 'mockjs';

Mock.setup({
    timeout: '200 - 400'
});

Mock.mock('http://data/todoList', {
    'list|5-10': [{
        'dateline': '@date("2018-04-dd")',
        'startDate': '@date("2018-04-dd HH:mm:ss")',
        'endDate': '@date("2018-04-dd HH:mm:ss")',
        'workName': '@ctitle(4)',
        'creater': '@cname()',
        'remark': '@ctitle(20)'
    }]
});
