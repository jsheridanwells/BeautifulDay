db = db.getSiblingDB('admin');
db.createUser({
  'user': process.env.BD_USER,
  'pwd': process.env.BD_PWD,
  'roles': [
    { 'role': 'readWrite', 'db': 'beautifulDay' }
  ]
});

