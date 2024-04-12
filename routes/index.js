const { Router } = require("express");
const jobsRoutes = require("./jobs.route");
const employersRoutes = require("./employers.route");
const router = Router();

router.use("/jobs", jobsRoutes);
router.use("/employers", employersRoutes);

module.exports = router;
