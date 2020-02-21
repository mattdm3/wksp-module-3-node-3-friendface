'use strict';

const express = require('express');
const morgan = require('morgan');

const { users } = require('./data/users');

const PORT = process.env.PORT || 8000;

let currentUser = null;

const handleHome = (req, res) => {
    if (!currentUser) {
        res.redirect("/signin"); return;
    }
    res.render('pages/homePage', {
        title: "Homepage",
        currentUser: currentUser,
        users: users
    });
}

const handleSignin = (req, res) => {
    //when currentuser is signed in, no signin page will show. 
    if (currentUser) {
        res.redirect("/"); return;
    }
    res.render("pages/signinPage", {
        title: "Signin"
    });
}

const handleUser = (req, res) => {
    const id = req.params.id;

    let userObject = {};
    let user = users.forEach(user => {
        if (user.id === id) {
            userObject = user;
        }
    });
    res.render('pages/friendPage', {
        title: "A Friend's Page",
        id: id,
        users: users,
        profile: userObject
    })
}

const handleName = (req, res) => {
    const firstName = req.query.firstName;
    currentUser = users.find(user => user.name === firstName) || null;
    res.redirect(`${currentUser ? '/' : '/signin'}`);


}

// -----------------------------------------------------
// server endpoints
express()
    .use(morgan('dev'))
    .use(express.static('public'))
    .use(express.urlencoded({ extended: false }))
    .set('view engine', 'ejs')

    // endpoints
    .get('/', handleHome)
    .get('/signin', handleSignin)
    .get('/user/:id', handleUser)
    .get('/getname', handleName)

    .get('*', (req, res) => {
        res.status(404);
        res.render('pages/fourOhFour', {
            title: 'I got nothing',
            path: req.originalUrl
        });
    })

    .listen(PORT, () => console.log(`Listening on port ${PORT}`));
