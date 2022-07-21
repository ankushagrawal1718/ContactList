const express = require('express');
const port = 8000;
const path = require('path');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

var contactList = [
    {
        name: 'ankush',
        phone: '293847238'
    },
    {
        name: 'ayush',
        phone: '29853782'
    }
]

app.get('/',function(req,res){

  return res.render('home',{
    title:"My Contact List",
    contact_list: contactList
  });
}); 

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"this is practice page"
    });
});

app.post('/contact-list',function(req,res){
    // console.log(req.body.name);
    // console.log(req.body.phone);
    contactList.push({
        name: req.body.name,
        phone: req.body.phone
    });
    return res.redirect('/');
});

app.listen(port,function(err){
    if(err){
        console.log("error in running server",err);
    }
    console.log("yup! my express server is running on port:",port);
});