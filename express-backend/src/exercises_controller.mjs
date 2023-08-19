import * as exercises from "./exercises_model.mjs"

function exercisesRoutes(app) {
  // POST /exercises
  app.post('/exercises', async (req, res) => {
    const atts = req.body
    try {
      const exercise = await exercises.createExercise(atts)
      res.status(201).send(exercise)
    } catch (error) {
      res.status(400).send({'Error': 'Invalid request'})
    }
  })

  // GET /exercises
  app.get('/exercises', async (req, res) => {
    const allExercises = await exercises.findAll()
    res.send(allExercises)
  })

  app.get('/exercises/:_id', async (req, res) => {
    const { _id } = req.params
    try {
      const exercise = await exercises.findExerciseById(_id)
      if (!exercise) { throw new Error('Not found') }
      res.send(exercise)
    } catch (error) {
      res.status(404).send({'Error': 'Not found'})
    }
  })

  app.put('/exercises/:_id', async (req, res) => {
    const { _id } = req.params
    const atts = req.body

    let exercise = null

    try { exercise = await exercises.findExerciseById(_id) }
    catch (error) { return res.status(404).send({'Error': 'Not found'}) }

    try { await exercises.updateExercise(_id, atts) }
    catch (error) { return res.status(400).send({'Error': 'Invalid request'}) }

    const updatedExercise = await exercises.findExerciseById(_id)
    res.send(updatedExercise)
  })

  app.delete('/exercises/:_id', async (req, res) => {
    const { _id } = req.params
    try {
      await exercises.deleteById(_id)
      res.status(204).send()
    } catch (error) {
      res.status(404).send({'Error': 'Invalid request'})
    }
  })
}

export default exercisesRoutes