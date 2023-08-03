const db = require('../config/connection');

const { User } = require('../models');
const { Pin } = require('../models');
const { Comment } = require('../models');


const userSeeds = require('./userSeeds.json');
const pinSeeds = require('./pinSeeds.json');
const commentSeeds = require('./commentSeeds.json');

// db.once('open', async () => {
//   try {
//     // delete existing data
//     await User.deleteMany({});
//     await Pin.deleteMany({});
//     await Comment.deleteMany({});

//     // seed Users and Pins
//     const createdUsers = await User.insertMany(userSeeds);
//     const createdPins = await Pin.insertMany(pinSeeds);

//     // for each pin, create multiple comments
//     for (const pin of createdPins) {
      
//       // randomly decide how many comments this pin should have
//       const numberOfComments = Math.floor(Math.random() * 5); // this will give a number between 0 and 4

//       for (let i = 0; i < numberOfComments; i++) {
//         // choose a random comment seed 
//         const commentSeed = commentSeeds[Math.floor(Math.random() * commentSeeds.length)];

//         // create the comment for this pin
//         const comment = await Comment.create({
//           pinId: pin._id,
//           ...commentSeed,
//         });

//         // add the comment to the pin's comments array
//         pin.comments.push(comment._id);
//       }
//       await pin.save();
//     }

//     console.log('Database seeding complete.');
//     process.exit(0);
//   } catch (error) {
//     console.error('Error seeding database:', error);
//     process.exit(1);
//   }
// });

db.once('open', async () => {
  try {
    // delete existing data
    await User.deleteMany({});
    await Pin.deleteMany({});
    await Comment.deleteMany({});

    // seed Users, Pins, and Comments
    const createdUsers = await User.insertMany(userSeeds);
    const createdPins = await Pin.insertMany(pinSeeds);
    // const createdComments = await Comment.insertMany(commentSeeds);

    // update the comments array in the corresponding pins
    // for (const comment of createdComments) {
    //   const pinId = comment.pinId; 
    //   const pinToUpdate = createdPins.find((pin) => pin._id === pinId);
    //   if (pinToUpdate) {
    //     pinToUpdate.comments.push(comment._id);
    //     await pinToUpdate.save();
    //   }
    // }

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
