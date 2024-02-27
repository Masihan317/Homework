const express = require("express")
const data = require("../data/2024-spring-student-info")
const fs = require("fs")

const studentInformation = express.Router()

/**
 * GET / to retrieve all the student-info
 */
studentInformation.get("/students", (req, res) => {
  res.json(data)
})

/**
 * POST / to retrieve your information based on student id
 */
studentInformation.get("/students/:studentId", (req, res) => {
  const { studentId } = req.params
  const foundStudent = data.find(s => s.student_id === studentId)

  if (foundStudent) {
    res.json(foundStudent)
  } else {
    res.status(404).json({
      message: "Student not found. Please enter a different student id or check your spelling."
    })
  }
})

/**
 * POST / to retrieve student's info who has taken CS548
 */
studentInformation.get("/students-CS548", (req, res) => {
  
})

/**
 * POST / to retrieve who has taken the courses you have taken except CS548.
 */
studentInformation.post("/students-same-courses", (req, res) => {
  
})

module.exports = studentInformation