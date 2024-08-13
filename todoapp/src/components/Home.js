import React, { useEffect, useState, useContext } from "react"
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import DoneIcon from "@mui/icons-material/Done"
import { NavLink } from "react-router-dom"
import { adddata, updatedata, deldata } from "./context/ContextProvider"
import "./Home.css" // Ensure you import your CSS file

function Home() {
  const [getuserdata, setUserdata] = useState([])
  const { udata, setUdata } = useContext(adddata)
  const { updata, setUPdata } = useContext(updatedata)
  const { dltdata, setDLTdata } = useContext(deldata)

  const getdata = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()
      if (res.status === 422 || !data) {
        console.log("error")
      } else {
        setUserdata(data)
        console.log("get data")
      }
    } catch (error) {
      console.error("Failed to fetch data", error)
    }
  }

  useEffect(() => {
    getdata()
  }, [])

  const deleteuser = async (id) => {
    try {
      const res2 = await fetch(`/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const deletedata = await res2.json()
      if (res2.status === 422 || !deletedata) {
        console.log(deletedata)
      } else {
        console.log("user deleted")
        getdata()
        setDLTdata(deldata)
      }
    } catch (error) {
      console.error("Failed to delete user", error)
    }
  }

  const markComplete = async (id) => {
    try {
      const res = await fetch(`/togglecomplete/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()
      if (res.status === 422 || !data) {
        console.log("Failed to mark as complete")
      } else {
        console.log("Task marked as complete")
        getdata()
      }
    } catch (error) {
      console.error("Failed to mark task as complete", error)
    }
  }

  return (
    <>
      {udata && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>Success!</strong> User added successfully!
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      {updata && (
        <div
          className="alert alert-primary alert-dismissible fade show"
          role="alert"
        >
          <strong>Success!</strong> User updated successfully!
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
      {dltdata && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>Success!</strong> User deleted successfully!
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-2">
            <NavLink to="/register" className="btn btn-primary">
              Add Data
            </NavLink>
          </div>
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-dark">
                <th scope="col">ID</th>
                <th scope="col">Task</th>
                <th scope="col">Description</th>
                <th scope="col">Priority</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {getuserdata.length > 0 ? (
                getuserdata.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.task}</td>
                    <td>{item.description}</td>
                    <td>{item.priority}</td>
                    <td className="d-flex gap-2">
                      <NavLink
                        to={`view/${item._id}`}
                        className="btn btn-success"
                      >
                        <RemoveRedEyeIcon />
                      </NavLink>
                      <NavLink
                        to={`edit/${item._id}`}
                        className="btn btn-primary"
                      >
                        <EditIcon />
                      </NavLink>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteuser(item._id)}
                      >
                        <DeleteIcon />
                      </button>
                      <button
                        className="btn btn-info"
                        onClick={() => markComplete(item._id)}
                      >
                        <DoneIcon />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Home
