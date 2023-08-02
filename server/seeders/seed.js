const db = require('../config/connection');

const { User } = require('../models');
const { Pin } = require('../models');
const { Comment } = require('../models');


const userSeeds = require('./userSeeds.json');
const pinSeeds = require('./pinSeeds.json');
const commentSeeds = require('./commentSeeds.json');

db.once('open', async () => {
  await User.deleteMany({});
  await Pin.deleteMany({});
  await Comment.deleteMany({});
  await User.create(userSeeds);
  await Pin.create(pinSeeds);
  await Comment.create(commentSeeds);

  console.log('all done!');
  process.exit(0);
});
