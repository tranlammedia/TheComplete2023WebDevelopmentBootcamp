import mongoose from "mongoose";
const { Schema } = mongoose;

mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB");

const fruitSchema = new Schema({
  _id: Number,
  name: {
    type: String,
    // minLength: 1,
    // maxLength: 10,
    // lowercase: true,
    // uppercase: true,
    // trim: true,
    // match: /^[a-zA-Z0-9_-]{3,16}$/
  },
  rating: {
    type: Number,
    // min: [0, 'is number'],
    // max: 10,
    // enum: [[0,1,2,3,4,5,6,7,8,9,10], "hello"]
  },
});

const personSchema = new Schema({
  name: String,
  age: Number,
  favouriteFruit: [{
    type: Number,
    ref: 'Fruits',
  }],
});

const Fruit = mongoose.model("Fruits", fruitSchema);
const Person = mongoose.model("Peoples", personSchema);

const pineapple = new Fruit({
  _id: 22,
  name: "Banana",
  rating: 8
});

const person = new Person({
  name: "Jun2",
  age: 18,
  favouriteFruit: pineapple._id
});

// person.favouriteFruit.push(pineapple._id)
await pineapple.save();
await person.save();

const findPeople = await Person.findOne({name: 'Jun1'}).populate('favouriteFruit')
console.log(findPeople) 

async function getAllFruits() {
  let fruits;
  try {
    fruits = await Fruit.find();
  } catch (error) {
    console.error("Error fetching users:", error);
  }
  return fruits;
}

async function addFruit(fruit) {
    const newFruit = new Fruit(fruit);
    try {
        // await Fruit.create(newFruit);
        await newFruit.save()
    } catch (error) {
        console.error("Error saving:", error.message);        
    }
}

async function updateFruit(oldValue, newValue) {
  try {
    const res = await Fruit.findOneAndUpdate(oldValue,newValue) // 1 so truong cu the
    // const res = await Fruit.updateOne(oldValue,newValue)

    // const res = await Fruit.replaceOne(oldValue,newValue) // ghi de toan bo
    console.log(res)
  } catch (error) {
    console.error("Error updating:", error.message);
  }
}

async function deleteFruit(delValue) { 
  try {
    const res = await Fruit.findOneAndDelete(delValue); // return 
    // const res = await Fruit.deleteOne(delValue) // RETURN INFO
    console.log(res)
  } catch (error) {
    console.error("Error delete:", error.message);
  }
 }

const fruit = {
    _id: 10,
    name: "Apple4",
    rating: -9.1
}

// Gọi hàm để lấy tất cả các tài liệu
// addFruit(fruit)
// getAllFruits().then((products) => console.log("All users:", products));
// updateFruit({name: 'Apple4'},{rating: 2})
// deleteFruit({name: 'Apple4'}) 