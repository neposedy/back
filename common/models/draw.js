module.exports = function(Draw) {

  var user = app.models.user;
  Draw.get_new = function(user, level, cb) {
    // move this to user. load the user somewhere
    var userPlayed = [];
    //Result.find(
    //  {where: {playerId: user}},
    //  function(err, results){
    //    if(err) throw err;
    //    if(results) {
    //      // foreach result fill userPla
    //    }
    //  }
    //);

    Draw.findOne(
      {where: {level: level}},
      function(err, draw){
        if (err) throw err;
        cb(null, draw);
    });
  }

  Draw.remoteMethod(
    'get_new',
    {
      accepts: [
        {arg: 'user', type: 'string'},
        {arg: 'level', type: 'string'}
      ],
      returns: {arg: 'draw', root: true},
      http: { verb: 'GET' }
    }
  );
};
