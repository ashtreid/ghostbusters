const db = require('../config/connection');

//TODO: Import correct models
// const { User } = require('../models');
// const { Location } = require('../models');

const userSeeds = require('./userSeeds.json');
const locationSeeds = require('./locationSeeds.json');

db.once('open', async () => {
  await User.deleteMany({});
  await Location.deleteMany({});
  await User.create(userSeeds);
  await Location.create(locationSeeds);

  console.log('all done!');
  process.exit(0);
});
