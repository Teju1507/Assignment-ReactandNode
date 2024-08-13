import React, { useState, useEffect } from "react"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import TaskIcon from "@mui/icons-material/Task"
import DescriptionIcon from "@mui/icons-material/Description"
import PriorityHighIcon from "@mui/icons-material/PriorityHigh"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { NavLink, useParams, useNavigate } from "react-router-dom"
import "./Detail.css" // Ensure you import your CSS file

function Detail() {
  const { id } = useParams()
  const [getuserdata, setUserdata] = useState(null) // Initialize as null

  const navigate = useNavigate()

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
        console.log("error")
      } else {
        setUserdata(data)
      }
    } catch (error) {
      console.error("Failed to fetch data", error)
    }
  }

  const handleBackButtonClick = () => {
    navigate("/")
  }

  useEffect(() => {
    getdata()
  }, [id])

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
        navigate("/")
      }
    } catch (error) {
      console.error("Failed to delete user", error)
    }
  }

  if (!getuserdata) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>Details</h1>
      <Card
        sx={{
          maxWidth: 600,
          borderRadius: 8,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          position: "relative",
        }}
      >
        <div className="action_buttons">
          <button
            className="btn btn-secondary mx-1"
            onClick={handleBackButtonClick}
          >
            <ArrowBackIcon />
          </button>
          <NavLink to={`/edit/${getuserdata._id}`}>
            <button className="btn btn-primary mx-1">
              <EditIcon />
            </button>
          </NavLink>
          <button
            className="btn btn-danger mx-1"
            onClick={() => deleteuser(getuserdata._id)}
          >
            <DeleteIcon />
          </button>
        </div>
        <CardContent>
          <div className="left_view">
            <h3 className="mt-3">
              <TaskIcon />
              Task: <span className="card-detail">{getuserdata.task}</span>
            </h3>
            <p className="mt-3">
              <DescriptionIcon />
              Description:{" "}
              <span className="card-detail">{getuserdata.description}</span>
            </p>
            <p className="mt-3">
              <PriorityHighIcon />
              Priority:{" "}
              <span className="card-detail">{getuserdata.priority}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Detail
