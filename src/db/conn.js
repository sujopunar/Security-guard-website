const mongoose = require("mongoose");
const key = process.env.KEY_DB;

mongoose
  .connect(
    "mongodb+srv://Access_db:12345@cluster0.o0o0t.mongodb.net/Security_Guard_Website?retryWrites=true&w=majority",
    // made this pehlay dk where from"mongodb+srv://Access_db:12345@cluster0.o0o0t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connection successful");
  })
  .catch((error) => {
    console.log(error);
  });
//www.youtube.com/watch?v=wUP5kjmzgrQ&ab_channel=TutorialsWebsite
