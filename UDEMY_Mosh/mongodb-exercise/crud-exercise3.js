/**
 * Question
 *
 * Get all the published courses that are $15 or more,
 * or have the word 'by' in their title.
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
  })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }]) // i: case insensitive
    .select('name author price');
  console.log(result);
}

getCourse();
