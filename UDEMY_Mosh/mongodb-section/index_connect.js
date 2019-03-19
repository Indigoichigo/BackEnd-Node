// Using References (Normalization)
let author = {
  name: 'Mosh',
};

let course = {
  author: 'id',
};

// Using Embedded Documents (Denormalization)
let course = {
  author: {
    name: 'Mosh',
  },
};
