module.exports = function(Draw) {


  Draw.new = function(user, level, cb) {
    var app = Draw.app;
    var user = app.models.user;

    Draw.findOne(
      // TODO: nin recently played
      // TODO: random game
      {where: {level: level}},
      function(err, draw){
        if (err) throw err;
        cb(null, draw);
    });
  }

  Draw.remoteMethod(
    'new',
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
