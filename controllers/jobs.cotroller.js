const pool = require("../config/db.config");

const getJobs = async (req, res) => {
  try {
    const jobs = await pool.query("SELECT * FROM jobs");
    res.status(200).json(jobs.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postJob = async (req, res) => {
  try {
    const postedJob = await pool.query(
      "INSERT INTO jobs (title) VALUES ($1) RETURNING *",
      [req.body.title]
    );
    res.status(201).json(postedJob.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const { title } = req.body;
    const { id } = req.params;
    const prevJob = await pool.query("SELECT * FROM jobs WHERE id=$1", [id]);
    const updatedJob = await pool.query(
      "UPDATE jobs SET title=$1 WHERE id=$2 RETURNING *",
      [title ? title : prevJob.rows[0].title, id]
    );
    res.status(200).json(updatedJob.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    await pool.query("DELETE FROM employers WHERE job_id=$1", [req.params.id]);
    await pool.query("DELETE FROM jobs WHERE id=$1", [req.params.id]);
    res.status(200).json("Job deleted");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getJobs, postJob, updateJob, deleteJob };
