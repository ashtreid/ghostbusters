const db = require('../config/connection');

const { User } = require('../models');
const { Pin } = require('../models');
const { Comment } = require('../models');


const userSeeds = require('./userSeeds.json');
const pinSeeds = require('./pinSeeds.json');
const commentSeeds = require('./commentSeeds.json');

db.once('open', async () => {
  try {
    // delete existing data
    await User.deleteMany({});
    await Pin.deleteMany({});
    await Comment.deleteMany({});

    // seed Users, Pins, and Comments
    const createdUsers = await User.insertMany(userSeeds);
    const createdPins = await Pin.insertMany(pinSeeds);
    const createdComments = await Comment.insertMany(commentSeeds);

    // update the comments array in the corresponding pins
    for (const comment of createdComments) {
      const pinId = comment.pinId; 
      const pinToUpdate = createdPins.find((pin) => pin._id === pinId);
      if (pinToUpdate) {
        pinToUpdate.comments.push(comment._id);
        await pinToUpdate.save();
      }
    }

    console.log('Database seeding complete.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
});







// db.once('open', async () => {
//   await User.deleteMany({});
//   await Pin.deleteMany({});
//   await Comment.deleteMany({});
//   await User.create(userSeeds);
//   await Pin.create(pinSeeds);
//   await Comment.create(commentSeeds);

//   console.log('all done!');
//   process.exit(0);
// });
