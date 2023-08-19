import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
  process.env.MONGODB_CONNECT_STRING,
  { useNewUrlParser: true }
);

const exerciseSchema = mongoose.Schema({
  name: { type: String, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  unit: { type: String, required: true },
  date: { type: String, required: true },
});

export const Exercise = mongoose.model("Exercise", exerciseSchema);

function isDateValid(date) {
  const format = /^\d\d-\d\d-\d\d$/;
  return format.test(date);
}

function isNameValid(name) {
  return typeof name === 'string' && name.length > 0
}

function isRepsValid(reps) {
  return typeof reps === 'number' && reps > 0
}

function isWeightValid(weight) {
  return typeof weight === 'number' && weight > 0
}

function isValidUnit(unit) {
  return typeof unit === 'string' && (unit === 'lbs' || unit === 'kgs')
}

function validateExerciseAtts(atts) {
  const { name, date, reps, weight, unit } = atts
  if ( ! isNameValid(name) ) { throw new Error("Invalid name.") }
  if ( ! isRepsValid(reps) ) { throw new Error("Invalid reps.") }
  if ( ! isWeightValid(weight) ) { throw new Error("Invalid weight.") }
  if ( ! isValidUnit(unit) ) { throw new Error("Invalid unit.") }
  if ( ! isDateValid(date) ) { throw new Error("Invalid date.") }
}

export async function createExercise(atts) {
  validateExerciseAtts(atts)

  const exercise = new Exercise(atts);
  await exercise.save()

  return exercise
}

export async function findAll() {
  const query = Exercise.find()
  const results = await query.exec()
  return results
}

export async function findExerciseById(_id) {
  const query = Exercise.findById(_id)
  return await query.exec()
}

export async function updateExercise(_id, atts) {
  validateExerciseAtts(atts)
  const query = Exercise.updateOne({_id}, atts)
  return await query.exec()
}

export async function deleteById(_id) {
  const exercise = await findExerciseById(_id)
  await exercise.deleteOne()
}

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
})