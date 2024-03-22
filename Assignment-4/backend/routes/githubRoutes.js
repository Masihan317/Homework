import express from 'express'

const githubRoutes = express.Router()
let data = await import("../data/githubSettings.json", { assert: { type: 'json' } })
data = data.default

const findRecursively = (object, searchKey) => {
  if (object.hasOwnProperty(searchKey)) {
    return object[searchKey];
  }
  for (let key in object) {
    if (typeof object[key] === 'object' && object[key] !== null) {
      const result = findRecursively(object[key], searchKey);
      if (result !== null) {
        return result;
      }
    }
  }
  return null;
};

githubRoutes.post("/", (req, res) => {
  try {
    const { searchQuery } = req.body
    const result = findRecursively(data, searchQuery)

    if (result === undefined) {
      res.status(404).json({ message: "Data not Found." })
    }

    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({
      message: "Server error occured. Please try again later.",
    });
  }
})

export default githubRoutes;