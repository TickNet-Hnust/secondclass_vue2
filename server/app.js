let express = require('express')
const Mock = require('mockjs')
let app = express()
let Random = Mock.Random
app.use(express.json({ limit: '2000000kb' }))
app.use(express.urlencoded({ extended: false }))

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
    next()
})

/* this is schoolYear */
app.get('/secondClass/schoolYear/list', (req, res) => {
    console.log(req)
    let rowArr = []
    for (let i = 0; i < 8; i++) {
        rowArr.push({
            serchValue: Random.date('yyyy-MM-dd'),
            createBy: Random.cname(),
            createTime: Random.date('yyyy-MM-dd'),
            upDateBy: Random.cname(),
            upDateTime: Random.date('yyyy-MM-dd'),
            remark: Random.title(5, 10),
            params: {},
            id: Random.integer(1, 20),
            yearName: `${Random.date('yyyy')}-${Random.date('yyyy')}学年`,
            newYear: Random.integer(1, 20),
            sort: Random.integer(1, 20)
        })
    }
    res.json(Mock.mock({
        code: 200,
        msg: "查询成功",
        total: 8,
        rows: rowArr
    }))
})
app.put('/secondClass/schoolYear/mutlti', (req, res) => {
    let count = Mock.mock('@integer(1,4)')
    res.json(Mock.mock({
        "deleteIds": [
            6,
            7
        ],
        "schoolYearList": [{
                "id": 11,
                "nowYear": 5,
                "sort": 43,
                "yearName": "2022"
            },
            {
                "nowYear": 5,
                "sort": 43,
                "yearName": "2023"
            }
        ]
    }))
})

/* this is trainingProgram*/
app.get('/secondClass/traningProgram/findClassNumber', (req, res) => {
    res.send('开发中')
})
app.put('/secondClass/traningProgram/multi', (req, res) => {
    res.json({
        "deleteIds": [
            6,
            7
        ],
        "schoolYearList": [{
                "id": 11,
                "nowYear": 5,
                "sort": 43,
                "yearName": "2021"
            },
            {
                "id": 12,
                "nowYear": 5,
                "sort": 43,
                "yearName": "2021"
            }
        ]
    })
})
app.get('/secondClass/trainingProgram/:id', (req, res) => {
    res.send('开发中')
})
app.get('/secondClass/trainingProgramList', (req, res) => {
    res.json(Mock.mock({
        msg: Random.word(5, 10),
        code: 200,
        data: {
            totalCount: Random.integer(1, 10),
            pageSize: 10,
            currPage: Random.integer(1, 10),
            totalPage: Random.integer(1, 10),
            list: [{
                id: Random.integer(1, 20),
                schoolYearId: Random.integer(1, 5),
                name: Random.cword(3, 8),
                courseCount: Random.integer(1, 10),
                applyingCount: Random.integer(1, 10),
                rank: Random.integer(1, 10),
                "status|1": [0, 1],
                createUserId: Random.integer(1, 10),
                createBy: Random.cname(),
                updateUserId: Random.integer(1, 10),
                updateBy: Random.cname(),
                deleteUserId: Random.integer(1, 10),
                createTime: `${Random.datetime('yyyy-MM-dd')}T${Random.datetime('HH:mm:ss')}.000+0800`,
                updateTime: Random.datetime('yyyy-MM-dd'),
                daleteTime: Random.datetime('yyyy-MM-dd')
            }]
        }
    }))
})
app.post('/secondClass/trainingProgram', (req, res) => {
    res.send({
        "name": "string",
        "rank": 0,
        "schoolYearId": 0,
        "status": 0
    })
})

app.listen('3000', () => {
    console.log('3000端口监听成功')
})