module.exports = function(User) {
  User.new_anon = function(cb) {
    cb(null, 1);
  }
  User.remoteMethod(
    'new_anon',
    {
      returns: {arg: 'user', root: true}
    }
  );
};
