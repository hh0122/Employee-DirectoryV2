// note.js
const express = require('express');
const router = express.Router();

const employees = require('../employees'); // Correct the path to the employees.js file

// notes endpoints
router.get('/', (req, res) => {
  res.send('Hello employees!');
});

router.get('/employees', (req, res) => {
  res.json(employees);
});

router.get('/employees/random', (req, res) => {
  const i = Math.floor(Math.random() * employees.length);
  res.json(employees[i]);
});

router.get('/employees/:id', (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send({ message: `There is no employee with id ${id}.` });
  }
});

router.post('/employees', (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).send({ message: 'Invalid name provided' });
  }

  const newEmployee = {
    id: employees.length ? employees[employees.length - 1].id + 1 : 1,
    name: name,
  };

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

module.exports = router;
