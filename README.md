## mock数据说明

#### 数据结构
```
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

```
#### 字段说明及格式

```
id:   
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
startTime  
    说明：日程起始具体时间  
    格式："HH:mm" 或 "周一"  
    类型：String  
endTime  
    日程结束具体时间  
    格式："HH:mm" 或 "周二"  
    类型：String  
title  
    日程内容  
    格式："开会开会开会"  
    类型：String  
creater  
    创建人  
    格式："张三"  
    类型：String  
remark  
    日程备注内容  
    格式："开会开会开会开会开会开会"  
    类型：String  
remindType  
    提醒时机  
    格式：0  
    类型：Number  
repeatType  
    重复时间段  
    格式：1   
    类型：Number  

```

#### remind / repeat表
```
remind = {
    normal: [
        { value: 0, label: "无" },
        { value: 1, label: "日程开始时" },
        { value: 2, label: "提前五分钟" },
        { value: 3, label: "提前15分钟" },
        { value: 4, label: "提前30分钟" },
        { value: 5, label: "提前1小时" },
        { value: 6, label: "提前1天" }
    ],
    allDay: [
        { value: 0, label: "无" },
        { value: 1, label: "当天8点" },
        { value: 2, label: "当天9点" },
        { value: 3, label: "当天10点" },
        { value: 4, label: "提前一天8点" },
        { value: 5, label: "提前一天9点" },
        { value: 6, label: "提前一天10点" }
    ]
};
repeat = [
    { value: 0, label: "不重复" },
    { value: 1, label: "每天" },
    { value: 2, label: "每周" },
    { value: 3, label: "每月" },
    { value: 4, label: "每年" }
];

```
