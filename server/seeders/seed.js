const db = require('../config/connection');

const { User } = require('../models');
const { Pin } = require('../models');
// TODO: Delete this later:
// const { Comment } = require('../models');

const userSeeds = require('./userSeeds.json');
const pinSeeds = require('./pinSeeds.json');
// TODO: Delete this later:
// const commentSeeds = require('./commentSeeds.json');

db.once('open', async () => {
  try {
    // delete existing data when data is seeded
    await User.deleteMany({});
    await Pin.deleteMany({});
    // TODO: Delete this later:
    // await Comment.deleteMany({});

    // seed Users and Pins (with comments)
    const createdUsers = await User.insertMany(userSeeds);
    const createdPins = await Pin.insertMany(pinSeeds);
    // const createdComments = await Comment.insertMany(commentSeeds)

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

// update the comments array in the corresponding pins
// for (const comment of createdComments) {
//   const pinId = comment.pinId;
//   const pinToUpdate = createdPins.find((pin) => pin._id === pinId);
//   if (pinToUpdate) {
//     pinToUpdate.comments.push(comment._id);
//     await pinToUpdate.save();
//   }
// }