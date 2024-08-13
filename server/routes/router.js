const express = require("express")
const router = express.Router()
const users = require("../models/userSchema")

// router.get("/", (req, res) => {
//   console.log("connect")
// });

//register use

router.post("/register", async (req, res) => {
  // console.log(req.body)
  const { task, description, priority } = req.body

  if (!task || !description || !priority) {
    res.status(422).send("please fill the data")
  }
  try {
    const preuser = await users.findOne({ email: task })
    console.log(preuser)

    if (preuser) {
      res.status(422).send("This task is already present")
    } else {
      const adduser = new users({
        task,
        description,
        priority,
      })
      await adduser.save()
      res.status(201).json(adduser)
      console.log(adduser)
    }
  } catch (error) {
    res.status(422).json(error)
  }
})

//get user data

router.get("/getdata", async (req, res) => {
  try {
    const userdata = await users.find()
    res.status(201).json(userdata)
    console.log(userdata)
  } catch (error) {
    res.status(422).json(error)
  }
})

//get individual user

router.get("/getuser/:id", async (req, res) => {
  try {
    console.log(req.params)
    const { id } = req.params

    const userindividual = await users.findById({ _id: id })
    console.log(userindividual)
    res.status(201).json(userindividual)
  } catch (error) {
    res.status(422).json(error)
  }
})

//updateuserdata

router.patch("/updateuser/:id", async (req, res) => {
  try {
    const { id } = req.params

    const updateduser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    console.log(updateduser)
    res.status(201).json(updateduser)
  } catch (error) {
    res.status(422).json(error)
  }
})

//deleteuser

router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const { id } = req.params

    const deleteuser = await users.findByIdAndDelete({ _id: id })
    console.log(deleteuser)
    res.status(201).json(deleteuser)
  } catch (error) {
    res.status(422).json(error)
  }
})

//completetask
router.patch("/togglecomplete/:id", async (req, res) => {
  try {
    const { id } = req.params
    const task = await users.findById(id)

    if (!task) {
      return res.status(404).send("Task not found")
    }

    const newPriority =
      task.priority === "Completed" ? task.originalPriority : "Completed"
    const updatedTask = await users.findByIdAndUpdate(
      id,
      { priority: newPriority },
      { new: true }
    )

    res.status(200).json(updatedTask)
  } catch (error) {
    res.status(422).json(error)
  }
})

module.exports = router
