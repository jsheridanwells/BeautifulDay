function getEnvVariable(envVar, defaultValue) {
    var command = run("sh", "-c", `printenv --null ${ envVar } >/tmp/${ envVar }.txt`);
    if (command != 0) return defaultValue;
    return cat(`/tmp/${ envVar }.txt`)
  }
  
  // create application user
  var dbName = getEnvVariable('DB_NAME', 'beautifulDay');
  db = db.getSiblingDB(dbName);
  db.createUser({
    'user': getEnvVariable('BD_USER', 'bd_user'),
    'pwd': getEnvVariable('BD_PWD', 'bd_user()'),
    'roles': [
      {
        'role': 'dbOwner',
        'db': getEnvVariable('DB_NAME', 'beautifulDay')
      }
    ]
  });
  
  