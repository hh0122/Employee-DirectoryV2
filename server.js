const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

//simply logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

  //Use the notes router
app.use("/", require("./api/note"));

  //Catch-all route for undefined enpoints
app.use((req, res, next) => {
  next({ status: 404, message:"Endpoint not found"});
});

  //Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500).json(err.message ?? "Something went wrong!");
});

app.listen(PORT, () => {
  `Listening on port ${PORT}...`;
});
