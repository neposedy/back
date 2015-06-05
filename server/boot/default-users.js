module.exports = function (app) {
  var User = app.models.user;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  function getOrCreateUser(username, password, email) {
    User.find({where: {username: username}, limit: 1}, function (err, users) {
      if (err) throw err;
      if (users.length > 0) {
        console.log('Found user ' + username + ', will not create any');
        return users[0];
      }
      else {
        User.create([
          {username: username, email: email, password: password}
        ], function (err, users) {
          if (err) throw err;
          console.log('Created user:', users);
          return users[0];
        });
      }
    });
  }

  function getOrCreateRole(name) {
    Role.find({where: {name: name}, limit: 1}, function (err, roles) {
      if (err) throw err;
      if (roles.length > 0) {
        console.log('Found role ' + name + ', will not create any');
        return roles[0];
      }
      else {
        Role.create({
          name: name
        }, function (err, roles) {
          if (err) throw err;
          console.log('Created role:', roles);
          return roles[0];
        });
      }
    });
  }

  function createPrincipal(role, user) {
    role.principals.find({where: {principalId: user.id}, limit: 1}, function (err, principals) {
      if (err) throw err;
      if (principals.length > 0) {
        console.log('Found pricipal for ' + user.username + ', will not create any');
        return principals[0];
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

  var admin = getOrCreateUser('admin', 'admin', 'admin@noreply.com');
  var adminRole = getOrCreateRole('admin');
  //createPrincipal(adminRole, admin);

  var user = getOrCreateUser('user', 'user', 'user@noreply.com');
  var userRole = getOrCreateRole('user');
  //createPrincipal(userRole, user);
};
