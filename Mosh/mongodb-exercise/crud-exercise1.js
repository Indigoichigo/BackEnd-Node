/**
 * Question
 *
 * Get all the published backend courses,
 * sort them by their name,
 * pick only their name author,
 * and display them
 */

const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true })
  .then(() => console.log('connect success'))
  .catch(() => console.log('connect fail'));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublish: Boolean,
  price: Number,
});

const Course = mongoose.model('Course', courseSchema);

async function getCourse() {
  const result = await Course.find({
    isPublished: true,
    tags: 'backend',
  })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });

  console.log(result);
}

getCourse();
