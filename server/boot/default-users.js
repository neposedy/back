module.exports = function (app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  function createUsersWithRole(role, users) {
    users.forEach(function (user) {
      User.findOne({where: {username: user.username}}, function (err, found_user) {
        if (err) throw err;
        if (found_user) {
          console.log('Found user ' + user.username + ', will not create any');
          assignRoleToUser(role, found_user);
        }
        else {
          User.create([
            {username: user.username, email: user.email, password: user.password}
          ], function (err, new_users) {
            if (err) throw err;
            console.log('Created user:', new_users);
            assignRoleToUser(role, new_users[0]);
          });
        }
      });

    });
  }

  function createRoleWithUsers(name, users) {
    Role.findOne({where: {name: name}}, function (err, role) {
      if (err) throw err;
      if (role) {
        console.log('Found role ' + name + ', will not create any');
        createUsersWithRole(role, users);
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
    RoleMapping.findOne({where: {principalId: user.id}}, function (err, principal) {
      if (err) throw err;
      if (principal) {
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
