const express = require("express");
const app = express();


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});


// Проміжне ПЗ 
app.use((req, res, next) => {
  console.log("Наше проміжне ПЗ");
  next();
});

// Передача параметра в URL. Перший спосіб – передати через параметр.
app.get("/contact/:id", (req, res) => {
  res.send(`<h1>Contact</h1> Параметр: ${req.params.id}`);
});

// Express-Router
const express = require("express");
const router = express.Router();

// визначимо домашній роутер
router.get("/", (req, res) => {
  res.send("Це головний роутер");
});

// визначимо роутер about
router.get("/about", (req, res) => {
  res.send("About");
});

module.exports = router;