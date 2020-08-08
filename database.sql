CREATE TABLE "tasklist"
(
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR(255) NOT NULL,
    "complete" boolean DEFAULT false
);


INSERT
INTO "tasklist"
("task") VALUES
('Grocery Shopping');
INSERT INTO "tasklist"
    ("task")
VALUES('Make a pastry for Sunday dinner');
