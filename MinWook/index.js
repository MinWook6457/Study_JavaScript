const express = require('express')
const app = express()
const port = 3000; // 서버 포트 번호

const toDoLists = ["밥먹기"]

app.set('view engine','pug');

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get('/', (req, res) => { 
  res.render('index', {toDoListTitle: '오늘의 할 일 : ' + toDoLists.length, toDoLists : toDoLists})
})

app.post('/add_list',(req,res)=>{
    const newContent = req.body.content
    console.log(newContent + ' 추가')
    toDoLists.push(newContent)
    res.redirect('/')
})

// app.listen() 함수를 사용해서 서버 실행
// 클라이언트는 'host:port'로 노드 서버에 요청을 보냄
app.listen(port,()=>{
    console.log('connected');
});

