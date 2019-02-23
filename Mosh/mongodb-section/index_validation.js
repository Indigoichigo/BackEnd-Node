const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('connect to MongoDB'))
  .catch(err => console.error('could not connect to mongoDB', err));

/**
 * build-in validation
 * required(return true, false)
 * minlength,
 * maxlength,
 * min,
 * max,
 */

const courseSchema = new mongoose.Schema({
  // 這裡是mongoose在資料驗證，mongoDB不在意有沒有值
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlenght: 255,
    // match: /pattern/,
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network'],
    lowercase: true,
    // uppercase: true,
    // trim: ture,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      // isAsync: true,
      // set an async validation
      // validator: function(v, callback) {
      //   setTimeout(() => {
      //     const result = v && v.length > 0;
      //     callback(result);
      //   }, 3000);
      // },
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'A course should have at least one tag',
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: v => Math.round(v), // use when getting document
    set: v => Math.round(v), // use when creating document
  },
});

const Course = mongoose.model('Course', courseSchema);

// CRUD-C
async function createCourse() {
  const course = new Course({
    name: 'html Course',
    category: 'web',
    author: 'Frank',
    tags: ['front-end'],
    // date will be created by default
    isPublished: true,
    price: 15.7,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    // console.log(ex.errors);
    console.log('!');
    for (field in ex.errors) {
      // full error message
      // console.log(ex.errors[field]);
      // short error message
      console.log(ex.errors[field].message);
    }
  }
}

// createCourse();

// CRUD-R
async function getCourse() {
  const courses = await Course.find({ _id: '5c6a2fcf59a4d52e890f5b09' })
    .sort({ name: 1 })
    .select({ name: 1, tags: 1, price: 1 });
  console.log(courses[0].price);
}

getCourse();

// CRUD-U
async function updateCourse(id) {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: 'Jason',
        isPubished: false,
      },
    },
    { new: true }
  );

  console.log(result);
}

// updateCourse();

// CRUD-D
async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });

  console.log(result);
}

// removeCourse();
