const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json())

app.get('/',(req, res)=>{
	res.send({success:true}).status(200)
})

app.post('/signup',(req, res)=>{
	const token = jwt.sign({data: req.body}, 'kline', {expiresIn: 3000});
	res.send({data:token}).status(200)
})

app.post('/signin',(req, res)=>{
	/*try {
		jwt.verify(req.body.token, 'kline', function(err, decoded) {
			 res.send({data: decoded}).status(200)
		});
	} catch(err) {
		 res.send({success: false}).status(200)
	}*/
	try {
		const header = req.headers['authorization'];

		if(typeof header !== 'undefined') {
			const bearer = header.split(' ');
			const token = bearer[1];
			jwt.verify(token, 'kline', function(err, decoded) {
				 res.send({data: decoded}).status(200)
			});
		} else {
			res.sendStatus(403)
		}
	} catch(err) {
		 res.sendStatus(401)
	}
})


app.listen('3000',()=>{
	console.log('server running on port 3000')
})