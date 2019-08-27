'use strict'

//Libraries
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

//Models
var User = require('../models/User');

process.env.SECRET_KEY = 'secret'

exports.register = function(req , res){

	console.log("register");	


	  const today = new Date()
	  const userData = {
	    first_name: req.body.first_name,
	    last_name: req.body.last_name,
	    email: req.body.email,
	    password: req.body.password,
	    created: today
	  }
	
	  User.findOne({
	    where: {
	      email: req.body.email
	    }
	  })
	    //TODO bcrypt
	    .then(user => {
	      if (!user) {
	        bcrypt.hash(req.body.password, 10, (err, hash) => {
	          userData.password = hash
	          User.create(userData)
	            .then(user => {
	              //res.json({ status: user.email + 'Registered!' })
				  return res.status(200).send({
					data:"User successfully registered",
					status: "success" 
				  });		              
	              
	              
	              
	            })
	            .catch(err => {
	              res.send('error: ' + err)
	            })
	        })
	      } else {
	        //res.json({ error: 'User already exists' })
			  return res.status(200).send({
				data:"User already exists",
				status: "error" 
			  });	        
	      }
	    })
	    .catch(err => {
	      //res.send('error: ' + err)
		  return res.status(200).send({
			data:err,
			status: "error" 
		  });	      
	    });
}

exports.login = function(req,res, next){

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
	        console.log("entro al if");
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          //res.send(token)
		  return res.status(200).send({
			data:{
				token:token
			},
			status: "success" 
		  });          
        } else {
    	  return res.status(200).send({
			data:"Wrong email or password",
			status: "error" 
		  });
        }
      } else {
    	  return res.status(200).send({
			data:"Wrong email or password",
			status: "error" 
		  });
      }
       
    })
    .catch(err => {
      res.status(200).json({ 
	      data: err + "err",
	      status: "error"
	  })
    })

}


exports.change_password = function(req, res){
  
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY)


    bcrypt.hash(req.body.password, 10, (err, hash) => {
      
		User.update(
		   {password: hash},
		   {where: {id: decoded.id} }
		 )
		 .then(function(rowsUpdate) {
			  return res.status(200).send({
				data:{
					rows_updated:rowsUpdate
				},
				status: "success" 
			  });	   
		 })



        .catch(err => {
          res.send('error: ' + err)
        })
    })
}



exports.profile = function(req, res){
  
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  var decoded = jwt.verify(req.body.token, process.env.SECRET_KEY)

  User.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

