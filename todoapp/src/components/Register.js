import React, { useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { adddata } from "./context/ContextProvider"

function Register() {
  const { udata, setUdata } = useContext(adddata)
  const navigate = useNavigate()
  const [inpval, setINP] = useState({
    task: "",
    description: "",
    priority: "Medium", // Default value set to Medium
  })

  const setdata = (e) => {
    const { name, value } = e.target
    setINP((preval) => ({
      ...preval,
      [name]: value,
    }))
  }

  const addinpdata = async (e) => {
    e.preventDefault()
    const { task, description, priority } = inpval
    try {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task,
          description,
          priority,
        }),
      })
      const data = await res.json()
      console.log(data)

      if (res.status === 422 || !data) {
        alert("error")
        console.log("error")
      } else {
        alert("Data added successfully!")
        console.log("Data added successfully!")
        navigate("/") // Navigate to the homepage on success
        setUdata(data)
      }
    } catch (error) {
      console.error("Failed to fetch data", error)
    }
  }

  return (
    <div className="container mt-5">
      <NavLink to="/" className="btn btn-link">
        Home
      </NavLink>
      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <h3 className="card-title">Register Task</h3>
          <form onSubmit={addinpdata}>
            <div className="mb-3">
              <label htmlFor="task" className="form-label">
                Task
              </label>
              <input
                type="text"
                className="form-control"
                id="task"
                name="task"
                value={inpval.task}
                onChange={setdata}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                name="description"
                className="form-control"
                id="description"
                rows={5}
                value={inpval.description}
                onChange={setdata}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="priority" className="form-label">
                Priority
              </label>
              <select
                name="priority"
                className="form-control"
                id="priority"
                value={inpval.priority}
                onChange={setdata}
                required
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
