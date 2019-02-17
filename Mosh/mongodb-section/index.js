const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('connect to MongoDB'))
  .catch(err => console.error('could not connect to mongoDB', err));

/**
 * SCHEMA TYPES
 * String
 * Number
 * Date
 * Buffer
 * Boolean
 * ObjectID
 * Array
 */
// Schema 一個結構（有點像interface...)
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);

// 按照Schema，建立一筆文件(document)
// CRUD-C
async function createCourse() {
  const course = new Course({
    name: 'React Course',
    author: 'Ray',
    tags: ['frontend', 'facebook'],
    // date will be created by default
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

// createCourse();

// CRUD-R
async function getCourse() {
  // 顯示頁數的方式
  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course.find({ author: 'Ray' })
    .limit(10) // 幾筆筆資料 //顯示頁數方式的話 10改成pageSize
    .skip((pageNumber - 1) * pageSize) // 顯示頁數的方式
    .sort({ name: 1 }) // 1:升幕排序 0:降幕排序
    .select({ name: 1, tags: 1 }) // 選擇要顯示的key
    .count(); // 顯示有幾筆符合
  console.log(courses);
}

getCourse();

/**
 * 比較查詢運算子
 * eq (equal)
 * ne (not equal)
 * gt (greater)
 * gte (greater or equal to)
 * lt (less than)
 * lte (less than or equal to)
 * in
 * nin (not int)
 * --------------------------------------------------
 * 邏輯查詢運算子
 * or
 * and
 */

/**
 * 範例
 *
 * 比較查詢運算子
 * .find({ price: { $gte: 10, $lte: 20 } })
 * .find({ price: { $in: [10, 15, 20] } })
 * --------------------------------------------------
 * 邏輯查詢運算子
 * .or([{ author: 'Mosh' }, { isPublished: true }])
 * .or([{ name: 'React' }, { isPublished: true }])
 * --------------------------------------------------
 * 正規表達式
 * start with 'Mosh'
 * .find({author: /^Mosh/ })
 * end with 'Hami'
 * .find({author: /Hami$/})
 * case insensitive, plus an i at the end
 * .find({author: /Hami%/i})
 */
// contains 'Ray'
// .find({author: /.*Ray.*/})

// CRUD-U
async function updateCourse(id) {
  // Query First
  // const course = await Course.findById(id);
  // if (!course) return;

  // course.isPubished = true;
  // course.name = 'Vue Course';

  // const result = await course.save();
  // console.log(result);

  //-------------------------------------------
  // Update First
  // const result = await Course.update(
  //   { _id: id },
  //   {
  //     $set: {
  //       author: 'Mosh',
  //       isPubished: false,
  //     },
  //   }
  // );

  // console.log(result);

  //-------------------------------------------
  // Find ID and Update
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
  // add {new: true} to show updated document, it will show origin document if not add.

  console.log(result);
}

updateCourse('5c6945ec62600607a5415c89');

// CRUD-D
async function removeCourse(id) {
  // mongoose will find the first one, and delete it
  const result = await Course.deleteOne({ _id: id });
  // delete mulit document
  // const result = await Course.deleteMany({ name: /Penguin/ });
  //
  // const result = await Course.findByIdAndRemove({ _id: id });

  console.log(result);
}

removeCourse('5c6944c19e6161072b755640');
