const { Router } = require("express");
const {
  getEmployers,
  getEmployer,
  postEmployer,
  updateEmployer,
  deleteEmployer,
} = require("../controllers/employers.controller");
const router = Router();

router.get("/", getEmployers);
router.get("/:id", getEmployer);
router.post("/post", postEmployer);
router.put("/:id", updateEmployer);
router.delete("/:id", deleteEmployer);

module.exports = router;
