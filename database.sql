CREATE TABLE "tasklist"
(
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(255) NOT NULL,
    "complete" VARCHAR(10) NOT NULL,
    "delete" VARCHAR(10) NOT NULL
);