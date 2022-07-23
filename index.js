const express = require('express');
const port = 8000;
const path = require('path');

const db = require('./config/mongoose');
const Contact = require('./modals/contact');

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static("assets"));

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

    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contacts');
            return;
        }
        return res.render('home',{
            title:"My Contact List",
            contact_list: contacts
          });
    })


  
}); 

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"this is practice page"
    });
});

app.post('/contact-list',function(req,res){
    // console.log(req.body.name);
    // console.log(req.body.phone);

    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // contactList.push(req.body);
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){console.log('error in creating a contact');
        return;}

        console.log('*********',newContact);
        return res.redirect('back');
    });

    // return res.redirect('/');
});

app.get('/delete-contact/',function(req,res){
    console.log(req.query);
    // let phone = req.query.phone;
    let id = req.query.id;
    // let contactIndex = contactList.findIndex(contact=>contact.phone == phone);
    // if(contactIndex != -1){
    //     contactList.splice(contactIndex,1);
    // }

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an contact');
            return;
        }

        return res.redirect('back');
    });

    
});

app.listen(port,function(err){
    if(err){
        console.log("error in running server",err);
    }
    console.log("yup! my express server is running on port:",port);
});