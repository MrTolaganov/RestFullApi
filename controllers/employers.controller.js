const pool = require("../config/db.config");

const getEmployers = async (req, res) => {
  try {
    const employers = await pool.query("SELECT * FROM employers");
    res.status(200).json(employers.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEmployer = async (req, res) => {
  try {
    const employer = await pool.query(
      "SELECT * FROM employers LEFT JOIN jobs ON employers.job_id=jobs.id WHERE employers.id=$1",
      [req.params.id]
    );
    res.status(200).json(employer.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postEmployer = async (req, res) => {
  try {
    const { name, degree, salary, job_id } = req.body;
    const postedEmployer = await pool.query(
      "INSERT INTO employers (name, degree, salary, job_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, degree, salary, job_id]
    );
    res.status(201).json(postedEmployer.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEmployer = async (req, res) => {
  try {
    const { name, degree, salary, job_id } = req.body;
    const { id } = req.params;
    const prevEmployer = await pool.query(
      "SELECT * FROM employers WHERE id=$1",
      [id]
    );
    const updatedEmployer = await pool.query(
      "UPDATE employers SET name=$1, degree=$2, salary=$3, job_id=$4 WHERE id=$5 RETURNING *",
      [
        name ? name : prevEmployer.rows[0].name,
        degree ? degree : prevEmployer.rows[0].degree,
        salary ? salary : prevEmployer.rows[0].salary,
        job_id ? job_id : prevEmployer.rows[0].job_id,
        id,
      ]
    );
    res.status(200).json(updatedEmployer.rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEmployer = async (req, res) => {
  try {
    await pool.query("DELETE FROM employers WHERE id=$1", [req.params.id]);
    res.status(200).json({ message: "Employer deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getEmployers,
  getEmployer,
  postEmployer,
  updateEmployer,
  deleteEmployer,
};
