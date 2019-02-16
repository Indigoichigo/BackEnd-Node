// simulate a callback process
let getUser = (id, callback) => {
  var user = {
    id,
    name: 'ray',
  };

  setTimeout(() => {
    callback(user);
  }, 1500);
};

getUser(31, userObj => {
  console.log(userObj);
});
