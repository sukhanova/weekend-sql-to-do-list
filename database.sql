CREATE TABLE "tasklist"
(
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(255) NOT NULL,
    "complete" VARCHAR (20) DEFAULT 'NO'
);

