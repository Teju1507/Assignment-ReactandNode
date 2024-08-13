import React, { useContext, useEffect, useState } from "react"
import { NavLink, useParams, useNavigate } from "react-router-dom"
import { updatedata } from "./context/ContextProvider"

function Edit() {
  const { updata, setUPdata } = useContext(updatedata)
  const navigate = useNavigate()
  const [inpval, setINP] = useState({
    task: "",
    description: "",
    priority: "Medium", // Default value set to Medium
  })

  const { id } = useParams()

  const setdata = (e) => {
    const { name, value } = e.target
    setINP((preval) => ({
      ...preval,
      [name]: value,
    }))
  }

  const getdata = async () => {
    try {
      const res = await fetch(`/getuser/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()
      if (res.status === 422 || !data) {
        console.log("Error fetching data")
      } else {
        setINP(data)
        console.log("Data fetched successfully")
      }
    } catch (error) {
      console.error("Failed to fetch data", error)
    }
  }

  useEffect(() => {
    getdata()
  }, [id])

  const updateuser = async (e) => {
    e.preventDefault()
    const { task, description, priority } = inpval
    try {
      const res2 = await fetch(`/updateuser/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task,
          description,
          priority,
        }),
      })
      const data2 = await res2.json()
      if (res2.status === 422 || !data2) {
        alert("Please fill all the fields")
      } else {
        alert("Data updated successfully")
        navigate("/") // Navigate to the homepage on success
        setUPdata(data2)
      }
    } catch (error) {
      console.error("Failed to update data", error)
    }
  }

  return (
    <div className="container mt-5">
      <NavLink to="/" className="btn btn-link">
        Home
      </NavLink>
      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <h3 className="card-title">Edit Task</h3>
          <form onSubmit={updateuser}>
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
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Edit
