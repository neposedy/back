module.exports = function(User) {

  User.recentPlays = function(userID) {
    var userPlayed = [];
    var Result = app.models.Result;

    Result.find(
      {where: {playerId: userID}},
      function(err, results){
        if(err) throw err;
        if(results) {
          // foreach result fill userPla
        }
      }
    );

  }

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
