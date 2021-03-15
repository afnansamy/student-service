const express = require('express')
require('dotenv').config();
const { sequelize } = require('./models');
const studentRoutes = require('./routes/students');

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 80;


//students routes
app.use('/students', studentRoutes);


//404 error
app.use(async (req, res, next) => {
  res.status(404).send("404. Not Found");
});

//other errors handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    }
  });
});

app.listen(PORT, async () => {
    console.log(`Server up on http://localhost:${PORT}`)
    await sequelize.authenticate()
    //sync is a function to rebuild tables
    //await sequelize.sync({force: true})
    console.log('Database Connected')
});