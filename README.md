## mock数据说明

#### 数据结构
```
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

```
#### 字段说明及格式

todoID:   
    说明：日程唯一标识
    格式：0
    类型：Number
dateline:  
    说明：创建该日程的日期
    格式："yyyy-MM-dd"
    类型：String
startDate:  
    说明：日程起始日期
    格式："yyyy-MM-dd"
    类型：String
endDate:  
    说明：日程结束日期
    格式："yyyy-MM-dd"
    类型：String
timeStart  
    说明：日程起始具体时间
    格式："HH:mm" 或 "周一"
    类型：String
timeEnd  
    日程结束具体时间
    格式："HH:mm" 或 "周二"
    类型：String
textVal  
    日程内容
    格式："开会开会开会"
    类型：String
creater  
    创建人
    格式："张三"
    类型：String
remarkVal  
    日程备注内容
    格式："开会开会开会开会开会开会"
    类型：String
remind  
    提醒时机
    格式：{ "value": 1, "label": "日程开始时"}
    类型：Object
repeat  
    重复时间段
    格式：{ "value": 0, "label": "不重复"} 
    类型：Object

#### remind / repeat表
```
remind = [
    { value: 0, label: "无" },
    { value: 1, label: "日程开始时" },
    { value: 2, label: "提前五分钟" },
    { value: 3, label: "提前15分钟" },
    { value: 4, label: "提前30分钟" },
    { value: 5, label: "提前1小时" },
    { value: 6, label: "提前1天" }
];
repeat = [
    { value: 0, label: "不重复" },
    { value: 1, label: "每天" },
    { value: 2, label: "每周" },
    { value: 3, label: "每两周" },
    { value: 4, label: "每月" },
    { value: 5, label: "每年" }
];

```
