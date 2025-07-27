// 할 일 앱

// restful API란
// 주소 + http 명령어
// 예시) Tasks post
//      Tasks get
//      Tasks put
//      Tasks delete

// 1. 할 일을 추가할 수 있다. C /tasks post
// 2. 할 일 리스트를 볼 수 있다. R /tasks get
// 3. 할 일에 대해서 끝남, 안 끝남 표시를 할 수 있다. U /tasks/:id put
// 4. 할 일을 삭제할 수 있다. D /tasks/:id delete

// 백엔드 준비
// 1. 기본세팅 : npm세팅, express, mongoose, app리스너
// 2. 라우터 주소 정의
// 3. 데이터베이스 스키마 정의
// 4. 기능정의 : CRUD
// 5. 테스트 : 포스트맨

// 프론트엔드 준비
// 1. 깃 클론
// 2. 기능만들기 : CRUD
// 3. 테스트

// 1. 기본세팅
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const cors = require("cors");
require("dotenv").config();
const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
console.log("mongouri", MONGODB_URI_PROD);

app.use(
  cors({
    origin: ["http://localhost:6500", "https://todolist-demo2.netlify.app"], // 허용할 프론트 주소들
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // ❗ Authorization 명시
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use("/api", indexRouter);

const mongoURI = MONGODB_URI_PROD;

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("DB connection fail", err);
  });

const PORT = process.env.PORT || 6500;

app.listen(PORT, () => {
  console.log(`서버 ${PORT}번 포트에서 실행 중`);
});

//1. 회원가입
// 유저가 이메일, 패스워드, 유저이름 입력해서 보냄
// 받은 정보를 저장함 (데이터베이스 모델필요)
// 패스워드를 암호화 시켜서 저장

// 1. 라우터
// 2. 모델
// 3. 데이터를 저장 (이미 가입된 유저 유무 ,패스워드 암호화)
// 4. 응답을 보낸다

// 2. 로그인
// 이메일 패스워드를 입력해서 보냄
// 데이터베이스에 해당 이메일과 패스워드를 가진 유저가 있는 지 확인
// 없으면 로그인 실패
// 있다면? 유저정보 + 토큰
// 프론트엔드에서는 이 정보를 저장

// 1. 라우터 설정
// 2. -> 이메일 패스워드 정보 읽어오기(post사용. get은 req.body를 가져올 수 없기 때문)
// 3. 이메일을 가지고 유저 정보 가져오기
// 4. 이 유저의 DB에 있는 패스워드와 프론트엔드가 보낸 패스워드가 같은 지 비교
// 5. 맞으면 토큰 발행.
// 6. 틀리면 에러메시지를 보냄
// 7. 응답으로 유저정보 + 토큰 보냄
