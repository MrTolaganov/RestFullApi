CREATE TABLE employers (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    degree VARCHAR(50) NOT NULL,
    salary NUMERIC(10) NOT NULL,
    job_id BIGINT REFERENCES jobs(id)
);

CREATE TABLE jobs (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(50) NOT NULL
);