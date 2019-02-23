/**
 * Question
 *
 * Get all the published frontend and backend courses,
 * sort them by their price in a descending order,
 * pick only their name and author,
 * and dispaly them.
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
    tags: { $in: ['frontend', 'backend'] },
  })
    .sort({ price: 1 })
    .select('name author');

  console.log(result);
}

getCourse();
