const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const config = require('./config/key');
const cookieParser = require('cookie-parser');
const { User } = require("./models/User");
const { Board } = require("./models/Board");
const { auth } = require("./middleware/auth");

// application/x-www.form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// apllication/json
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('hello world!~~~ 안녕하세요'));

// 게시판 server api 작업
app.get('/api/board/list', (req, res) => {
    Board.find((err, list) => {
        if (err) return res.json({ success: false, err });
        console.log(list);
        return res.status(200).json({
            surccess: true,
            listData: list
        });
    });
});

app.get('/api/board/write', (req, res) => {
    // 작성한 글 정보를 client에서 가져오면
    // 가져온 데이터들을 데이터 베이스에 넣어준다.
    const board = new Board(req.body);
    board.save((err, data) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        })
    });
});

app.post('/api/users/register', (req, res) => {
    // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
    // 가져온 데이터들을 데이터 베이스에 넣어준다.
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        })
    });
});

app.post('/api/users/login', (req, res) => {
    // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            });
        }

        // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) {
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
            }

            // 비밀번호 까지 맞다면 토큰을 생성하기.
            user.generateToken((err, user) => {
                if (err) {
                    return res.status(400).send(err);
                }

                // 토큰을 저장한다. 쿠키, 로컬스토리지 등..
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id });
            });
        });
    });
});

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        { token: "" },
        (err, user) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({
                success: true
            });
        }
    );
});

app.get('/api/users/auth', auth, (req, res) => {
    // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True 라는 말
    res.status(200).json({
        _id: req.user._id, // id
        isAdmin: req.user.role === 0 ? false : true, // 관리자
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastName: req.user.lastName,
        role: req.user.role,
        image: req.user.image
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));