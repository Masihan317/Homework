const express = require("express");
const data = require("../data/2024-spring-student-info");
const fs = require("fs");

const studentInformation = express.Router();

/**
 * GET / to retrieve all the student-info
 */
studentInformation.get("/students", (req, res) => {
  try {
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({
        message: "No student information is available now.",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server error occured. Please try again later.",
    });
  }
});

/**
 * POST / to retrieve your information based on student id
 */
studentInformation.post("/search-students-by-id", (req, res) => {
  try {
    const { studentId } = req.body;
    const foundStudent = data.find((s) => s.student_id === studentId);

    if (foundStudent) {
      res.json(foundStudent);
    } else {
      res.status(404).json({
        message:
          "Student not found. Please enter a different student id or check your spelling.",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server error occured. Please try again later.",
    });
  }
});

/**
 * POST / to retrieve student's info who has taken CS548
 */
studentInformation.post("/students-CS548", (req, res) => {
  try {
    const cs548Students = data.filter((s) =>
      s.courses.some((c) => c.course_id === "CS548")
    );

    if (cs548Students) {
      const studentIds = cs548Students.map((student) => student.student_id);
      res.json(studentIds);
    } else {
      res.status(400).json({
        message: "No student is currently taking CS548.",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server error occured. Please try again later.",
    });
  }
});

/**
 * POST / to retrieve who has taken the courses you have taken except CS548.
 */
studentInformation.post("/students-same-courses", (req, res) => {
  try {
    const { studentId } = req.body;
    const myCourses = data.filter((s) => s.student_id === studentId)[0].courses;
    const myCourseIds = myCourses
      .map((c) => c.course_id)
      .filter((c) => c !== "CS548");

    const sameCourseStudents = data.filter(
      (s) =>
        s.student_id !== studentId &&
        s.courses.some((c) => myCourseIds.includes(c.course_id))
    );

    res.json(sameCourseStudents);
  } catch (err) {
    res.status(500).json({
      message: "Server error occured. Please try again later.",
    });
  }
});

module.exports = studentInformation;
