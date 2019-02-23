const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model(
  'Course',
  new mongoose.Schema({
    name: String,
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.update(
    { _id: courseId },
    {
      $unset: {
        author: '',
      },
    }
  );
}

// updateAuthor('5c6a800d6cf6b74733d6d53d');

// add author
async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

// remove author
async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

// remove multi authors
async function removeAuthors(courseId, authorId) {
  const course = await Course.findById(courseId);
  for (id of authorId) {
    (async id => {
      const author = await course.author.id(id);
      author.remove();
      course.save();
    })();
  }
}

removeAuthor('5c6a83109224ae487fbaa13b', '5c6a838d7e170c48da325826');

// removeAuthors('5c6a83109224ae487fbaa13b', [
//   '5c6a838d7e170c48da325826',
//   '5c6a84f837283249aa9dec6a',
// ]);
// addAuthor('5c6a83109224ae487fbaa13b', { author: 'Luke' });
