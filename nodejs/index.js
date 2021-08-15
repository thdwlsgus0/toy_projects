const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const {User} = require('./models/User');
const config = require('./config/key');

// application/x-www-form-urlencoded 데이터를 가져오는 것
app.use(bodyParser.urlencoded({extended:true}));

// application/json을 가져오기 위해서 사용
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB connected..'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World'));

app.post('/register', (req, res) => {
	// 회원 가입할 때 필요한 정보들을 client에서 가져오면
	// 그것들을 데이터 베이스에 넣어줍니다.
	
	const user = new User(req.body);
	
	user.save((err, userInfo) => {
		if(err) return res.json({ success: false, err});
		return res.status(200).json({
			success: true
		})
	});
});

app.post('/login', (req, res) => {
	// 요청된 이메일을 데이터베이스에서 있는지 찾는다.

	User.findOne({ email: req.body.email }, (err, user) => {
		if(!user){
			return res.json({
				loginSuccess: false,
				message: "제공된 이메일에 해당하는 유저가 없습니다."
			})
		}
	});


	// 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
	user.comparePassword(req.body.password, (err, isMatch) => {
		if(!isMatch){
			return res.json({loginSuccess: false, message:"비밀번호가 틀렸습니다."});
		}
		

	})
	// 비밀번호까지 맞다면 토큰을 생성하기 

});

app.listen(port, () => console.log(`Example app listening on port ${port}`));