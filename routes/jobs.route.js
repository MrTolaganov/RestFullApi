const { Router } = require("express");
const {
  getJobs,
  postJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs.cotroller");
const router = Router();

router.get("/", getJobs);
router.post("/post", postJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
