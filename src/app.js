const express = require("express");
const { redirect } = require("express/lib/response");
const dotenv = require("dotenv").config({ path: "../.env" });
require("./db/conn");
const hbs = require("hbs");
const async = require("hbs/lib/async");
const path = require("path");
const bcrypt = require("bcryptjs");
const app = express(); //can get all methods and properties of express in app
const port = process.env.PORT || 3000;
const Register = require("./models/userSchema");
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

//setting the path
const staticpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");
const login = path.join(__dirname, "/models/login.js");

//middleware
app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);
app.use(
  "/jq",
  express.static(path.join(__dirname, "../node_modules/jquery/dist"))
);
app.use(express.static(staticpath));

//informing express about the handlebars view application
app.set("view engine", "hbs");
//this states that whenever theres views is called, its path has been declared thoough templatepaths
app.set("views", templatepath);

hbs.registerPartials(partialpath);

//routing
// app.get(path, callback)
app.get("/", (req, res) => {
  // "/" means directly to home screen
  res.render("index");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/UserScreens", (req, res) => {
  res.render("UserScreens");
});

app.get("/userUpdateid", (req, res) => {
  res.render("userUpdate");
});

app.get("/UserScreensid", (req, res) => {
  res.render("UserScreens");
});

// app.get("/AdminScreens", (req, res) => {
//   res.render("AdminScreens");
// });
//Creating a sign in form

app.post("/#registerid", async (req, res) => {
  try {
    const newUser = Register({
      name: req.body.Name,
      streetnumber: req.body.streetnumber,
      emailaddress: req.body.emailAddress,
      phonenumber: req.body.phoneNumber,
      password: req.body.password,
    });
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) console.log(err);
        newUser.password = hash;
        newUser
          .save()
          .then((user) => {
            res.status(201).render("login.hbs");
          })
          .catch((error) => console.log(error));
      })
    );
  } catch (error) {
    res.status(400).console.log(error);
    res.redirect("/");
  }
});
app.get("/#loginid", (req, res) => {
  res.redirect("/");
});
app.post("/#loginid", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await Register.findOne({ email: email }); //the email entered is compared to tthe one in the db
    if (useremail) passwordValid = await bcrypt.compare(useremail.password);
    if (passwordValid) {
      res.status(201).redirect("/UserScreen");
    }
  } catch (error) {}
});

// app.post("/admin", async (req, res) => {
//   try {
//     const email = req.body.email;
//     const password = req.body.password;
//     const useremail = await Register.findOne({email:email})//the email entered is compared to tthe one in the db
//   if (useremail)
//     const passwordValid = await bcrypt.compare(,useremail.password);
//     if (passwordValid){
//       res.status(201).redirect('/AdminScreens')
//     }
//   } catch (error) {
//     res.status(404).redirect('/admin')
//   }
// });

app.get("/AdminLogin", (req, res) => {
  res.render("AdminLogin.hbs");
});

app.post("/AdminLogin", (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if ((username == USERNAME) & (password == PASSWORD)) {
      res.status(201).render("AdminScreens");
    } else {
      res.status(404).redirect("/AdminLogin").console.log("Wrong");
    }
  } catch (error) {
    res.status(404).redirect("/AdminLogin");
  }
});
//server create
app.listen(port, () => {
  console.log(`server running at port number ${port}`);
});
