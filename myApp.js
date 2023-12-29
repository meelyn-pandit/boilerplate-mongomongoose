require('dotenv').config();
let mongoose = require('mongoose')

let Person;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String],
});

Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let me = new Person({
    name: "Meelyn",
    age: 33,
    favoriteFoods: ['Dosa', 'Idli', 'Medu Vadha',]
  })
  me.save((err, data) => {
    if (err) return console.error(err)
    done(null, data)
  })
};
let arrayOfPeople = [
  {
    name: "Pallavi",
    age: 63,
    favoriteFoods: ['Poori','Samosa', 'Chat'],
  },
  {
    name: "Caamine",
    age: 36,
    favoriteFoods: ['Tofu', 'cauliflower', 'noodles'],
  },
  {
    name: "Alex",
    age: 37,
    favoriteFoods: ['Steak', 'Pork', 'Tofu'],
  },
  {
    name: "Leo",
    age: 0.08,
    favoriteFoods: ["Milk"]
  },
]
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err)
    done(null, people);
  })
};

let personName = "Meelyn"
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if (err) return console.error(err)
    done(null, data);
  })
};

let food = "Dosa"
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => { // food does not need to be in array brackets
    if (err) return console.error(err)
    done(null, data);
  })
};

let personId = 'Meelyn'
const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, data) => {
    if (err) return console.error(err)
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, (err, person) => {
    if (err) return console.error(err)
    person.favoriteFoods.push(foodToAdd)
    person.save((err, data) => {
      if (err) return console.error(err)
      done(null, data)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {new: true}, (err, person) => {
    if (err) return console.error(err)
    person.age = ageToSet
    person.save((err, data) => {
      if (err) return console.error(err)
      done(null, data)
    })
  })
  // done(null /*, data*/);
};

personId = 'Alex'
const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, (err, person) => {
    if (err) return console.error(err)
    done(null, person);
  })
  // done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, person) => {
    if (err) return console.error(err)
    done(null, person)
  })
  // done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  let findQuery = Person.find({favoriteFoods: foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select('-age')

  findQuery.exec((err, person) => {
    if (err) console.error(err)
    done(null, person)
  })
  
  // done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
