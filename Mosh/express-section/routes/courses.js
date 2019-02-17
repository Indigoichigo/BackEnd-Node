const express = require('express');
const router = express.Router();
const Joi = require('joi');

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
  };

  return Joi.validate(course, schema);
}

const courses = [
  {
    id: 1,
    name: 'course1',
  },
  {
    id: 2,
    name: 'course2',
  },
  {
    id: 3,
    name: 'course3',
  },
];

// fetch all
router.get('/', (req, res) => {
  res.send(courses);
});

// fetch single course
router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send('ID not found');
  }

  res.send(course);
});

// create a course
router.post('/', (req, res) => {
  const { error } = validateCourse(req.body); // result.error
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// update a course
router.put('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('ID not found');
  }

  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  course.name = req.body.name;
  res.send(course);
});

// delete a course
router.delete('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('ID not found');
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

module.exports = router;
