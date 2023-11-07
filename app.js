//jshint esversion:6
const express = require("express");
const bodyparser = require("body-parser");
const date= require(__dirname+"/date.js");
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const port = 3000;
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];
app.get("/", (req, res) => {
  
 const day=date.getDate();
  res.render("list", { listTitle: day, newListItem: items });


});
app.post("/", (req, res) => {

  let item = req.body.newItem;
  
  if (req.body.list === "Work List") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
})
app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", newListItem: workItems });
})

app.get("/about",(req,res)=>{
  res.render("about");
})
app.listen(port, () => {
  console.log("server is started in port 3000");
});
