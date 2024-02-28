const express = require("express");
const data = require("../data/2024-spring-student-info");
const fs = require("fs");

const studentInformation = express.Router();

/**
 * GET / to retrieve all the student-info
 */
studentInformation.get("/students", (req, res) => {
  try {
    const userIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userDevice = req.header("User-Agent");

    if (data) {
      res.json({
        response: data,
        userIP,
        userDevice,
      });
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
    const userIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userDevice = req.header("User-Agent");

    const { studentId } = req.body;
    const foundStudent = data.find((s) => s.student_id === studentId);

    if (foundStudent) {
      res.json({
        response: foundStudent,
        userIP,
        userDevice,
      });
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
    const userIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userDevice = req.header("User-Agent");

    const cs548Students = data.filter((s) =>
      s.courses.some((c) => c.course_id === "CS548")
    );

    if (cs548Students) {
      const studentIds = cs548Students.map((student) => student.student_id);
      res.json({
        response: studentIds,
        userIP,
        userDevice,
      });
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
    const userIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userDevice = req.header("User-Agent");

    const { studentId } = req.body;
    const student = data.filter((s) => s.student_id === studentId);

    if (student.length !== 0) {
      const myCourses = student[0].courses;

      if (myCourses.length !== 0) {
        const myCourseIds = myCourses
          .map((c) => c.course_id)
          .filter((c) => c !== "CS548");

        const sameCourseStudents = data.filter(
          (s) =>
            s.student_id !== studentId &&
            s.courses.some((c) => myCourseIds.includes(c.course_id))
        );

        if (sameCourseStudents) {
          res.json({
            response: sameCourseStudents,
            userIP,
            userDevice,
          });
        } else {
          res.status(400).json({
            message:
              "No one is taking the same course (excluding CS548) with the given students.",
          });
        }
      } else {
        res.status(400).json({
          message:
            "Could not find the courses of the students with the given student id.",
        });
      }
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

module.exports = studentInformation;
