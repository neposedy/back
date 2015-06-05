module.exports = function (app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  function createUsersWithRole(role, users) {
    users.forEach(function (user) {
      User.find({where: {username: user.username}, limit: 1}, function (err, users) {
        if (err) throw err;
        if (users.length > 0) {
          console.log('Found user ' + user.username + ', will not create any');
          assignRoleToUser(role, users[0]);
        }
        else {
          User.create([
            {username: user.username, email: user.email, password: user.password}
          ], function (err, users) {
            if (err) throw err;
            console.log('Created user:', users);
            assignRoleToUser(role, users[0]);
          });
        }
      });

    });
  }

  function createRoleWithUsers(name, users) {
    Role.find({where: {name: name}, limit: 1}, function (err, roles) {
      if (err) throw err;
      if (roles.length > 0) {
        console.log('Found role ' + name + ', will not create any');
        createUsersWithRole(roles[0], users);
      }
      else {
        Role.create({
          name: name
        }, function (err, roles) {
          if (err) throw err;
          console.log('Created role:', roles);
          createUsersWithRole(roles[0], users);
        });
      }
    });
  }

  function assignRoleToUser(role, user) {
    RoleMapping.find({where: {principalId: user.id}, limit: 1}, function (err, principals) {
      if (err) throw err;
      if (principals.length > 0) {
        console.log('Found pricipal for ' + user.username + ', will not create any');
      }
      else {
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: user.id
        }, function (err, principals) {
          if (err) throw err;
          console.log('Created principal:', principals);
        });
      }
    })
  }

  createRoleWithUsers('admin', [{username: 'admin', password: 'admin', email: 'admin@noreply.com'}]);
  createRoleWithUsers('user', [{username: 'user', password: 'user', email: 'user@noreply.com'}]);

};
