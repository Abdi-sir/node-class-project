let router = require('express').Router()
let faker = require('faker')
let Project = require('../models/project')
let moment = require('moment');
let User = require('../models/user');
const project = require('../models/project');
fs = require('fs');
router.get('/',(req,res)=>{
	res.render('index')
});

router.get('/substring',(req,res)=>{
	let  query, search, search_field;
	
		if (req.body.select != 'undefined') {
			sort = req.body.select;
		}
	
		let perPage = Number(req.body.perPage) || 10;
		let page = Number(req.body.page) || 1;
	
		if (req.body.search != undefined && req.body.search_field != undefined && req.body.search != '' && req.body.search_field != '') {
			search = req.body.search;
			search_field = req.body.search_field;
			query = { 'search': search_field };
	
			if (search == 'name') {
				query = { name: search_field };
			} else if (search == 'department') {
				query = { department: search_field };
			} else if (search == 'title') {
				query = { title: search_field };
			} else if (search == 'abstruct') {
				query = { abstruct: search_field };
			} else {
				query = { id: search_field };
			}
		} else {
			query = { 'name': { $ne: null } };
		}
	
		Project.boyermoor(query).skip((perPage * page) - perPage).limit(perPage).sort(sort)
			.exec((err, project) => {
				Project.count(query).exec((err, count) => {
					if (err) return next(err)
					res.render('/', {
						project: project,
						current: page,
						pages: Math.ceil(count / perPage),
						perPage: perPage,
						sort: sort,
						search: search,
						moment: moment
					})
				})
			})
	});

router.get('/search',(req,res)=>{
		let  query, search, search_field;
	
		if (req.body.select != 'undefined') {
			sort = req.body.select;
		}
	
		let perPage = Number(req.body.perPage) || 10;
		let page = Number(req.body.page) || 1;
	
		if (req.body.search != undefined && req.body.search_field != undefined && req.body.search != '' && req.body.search_field != '') {
			search = req.body.search;
			search_field = req.body.search_field;
			query = { 'search': search_field };
	
			if (search == 'name') {
				query = { name: search_field };
			} else if (search == 'department') {
				query = { department: search_field };
			} else if (search == 'title') {
				query = { title: search_field };
			} else if (search == 'abstruct') {
				query = { abstruct: search_field };
			} else {
				query = { id: search_field };
			}
		} else {
			query = { 'name': { $ne: null } };
		}
	
		Project.bruteforce_string(query).skip((perPage * page) - perPage).limit(perPage).sort(sort)
			.exec((err, project) => {
				Project.count(query).exec((err, count) => {
					if (err) return next(err)
					res.render('user', {
						project: project,
						current: page,
						pages: Math.ceil(count / perPage),
						perPage: perPage,
						sort: sort,
						search: search,
						moment: moment
					})
				})
			})
	});
	
router.get('/sort',(req,res)=>{
	let sort, query;
	if (req.body.select != 'undefined') {
		sort = req.body.select;
	}

	let perPage = Number(req.body.perPage) || 10;
	let page = Number(req.body.page) || 1;

	if (req.body.sort != undefined && req.body.sort != undefined && req.body.sort != '' && req.body.sort != '') {
		sort = req.body.sort;
		sort = req.body.sort;
		query = { 'sort': sort };

		if (sort == 'name') {
			query = { name: sort };
		} else if (sort == 'department') {
			query = { department: sort};
		} else if (sort == 'ID') {
			query = { id: sort };
		}
	} else {
		query = { 'name': { $ne: null } };
	}

	Project.insertionsort(query).skip((perPage * page) - perPage).limit(perPage).sort(sort)
		.exec((err, project) => {
			Project.count(query).exec((err, count) => {
				if (err) return next(err)
				res.render('user', {
					project: project,
					current: page,
					pages: Math.ceil(count / perPage),
					perPage: perPage,
					sort: sort,
					search: search,
					moment: moment
				})
			})
		})
});


router.get('/data',(req,res)=>{
	res.render('data');
})
router.get('/login',(req,res)=>{
	res.render('login')
});
router.get('/profile',(req,res)=>{
	res.render('profile')
});
router.get('/register',(req,res)=>{
	res.render('register')
});
router.get('/add_user', (req, res, next) => {

    let project = {
        name: faker.name.name,
        department: faker.internet.department,
        title: faker.internet.title,
        abstruct: faker.internet.abstruct
    }
    res.render('add_user', { project: project });
});
// to add new project
router.post('/added', (req, res, next) => {
    Project.findOne({}, (err, data) => {

        if (data) {
            c = data.id + 1;
        } else {
            c = 1;
        }

        let project = new Project({
            id: c,
            name: req.body.name,
            department: req.body.department,
            title: req.body.title,
            abstruct: req.body.abstruct
        })

        project.save((err, success) => {
            if (err) {
                console.log(err);
            } else {
				const newObject = {
			
					"name":req.body.title,
					"shortname":req.body.abstruct,
					"reknown": req.body.name,
					"bio": req.body.department,
				}
			fs.appendFile('./public/data.json',JSON.stringify(newObject, null, 4)
			, function (err) {
				if (err) throw err;
				console.log('Saved!');
			  });


                res.redirect('/')
            }
        })
    }).sort({ _id: -1 }).limit(1);
	
	

});

//to get list of project
router.post('/products', (req, res, next) => {
    let sort, query, search, search_field;

    if (req.body.select != 'undefined') {
        sort = req.body.select;
    }

    let perPage = Number(req.body.perPage) || 10;
    let page = Number(req.body.page) || 1;

    if (req.body.search != undefined && req.body.search_field != undefined && req.body.search != '' && req.body.search_field != '') {
        search = req.body.search;
        search_field = req.body.search_field;
        query = { 'search': search_field };

        if (search == 'name') {
            query = { name: search_field };
        } else if (search == 'department') {
            query = { department: search_field };
        } else if (search == 'title') {
            query = { title: search_field };
        } else if (search == 'abstruct') {
            query = { abstruct: search_field };
        } else {
            query = { id: search_field };
        }
    } else {
        query = { 'name': { $ne: null } };
    }

    Project.find(query).skip((perPage * page) - perPage).limit(perPage).sort(sort)
        .exec((err, project) => {
            Project.count(query).exec((err, count) => {
                if (err) return next(err)
                res.render('user', {
                    project: project,
                    current: page,
                    pages: Math.ceil(count / perPage),
                    perPage: perPage,
                    sort: sort,
                    search: search,
                    moment: moment
                })
            })
        })
});

// below this about registration of student
///////authentication
router.post('/register', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;//accepting request from the browser sign up

	if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf){
		res.send();//nothing respond
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({email:personInfo.email},function(err,data){//finding from the database if the given email is exist or not
				if(!data){//if not the email is reapeted register new user
					var c;
					User.findOne({},function(err,data){
						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newPerson = new User({
							unique_id:c,
							email:personInfo.email,
							department:personInfo.department,
							username: personInfo.username,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);

					//to file saving 
                       
					res.render('login.ejs')
					//res.send({"Success":"You are regestered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
});

//authorization about login page
router.post('/login', function (req, res, next) {
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){//find the email from the database and check from req.body.email
		if(data){
			
			if(data.password==req.body.password){//if the we enterd password(req.body.password) and the password from the database is match
				//console.log("Done Login");
			//req.session.userId = data.unique_id;
			//console.log(req.session.userId);
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	}
	
	
	);
});
//this is about logout page 
router.get('/logout', function (req, res, next) {
	console.log("logout")
	return res.redirect('/');
    	
});
//foor forgotten password

router.get('/forgetpass', function (req, res, next) {
	res.render("forget.ejs");
});

router.post('/forgetpass', function (req, res, next) {
	//console.log('req.body');
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
		console.log(data);
		if(!data){
			res.send({"Success":"This Email Is not regestered!"});
		}else{
			// res.send({"Success":"Success!"});
			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
	
});

module.exports = router