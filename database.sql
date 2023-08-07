CREATE TABLE "TODO"(
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (250) NOT NULL,
  "isComplete" BOOLEAN DEFAULT FALSE
  );
  
  INSERT INTO "TODO" 
	("task", "isComplete") 
VALUES 
	('Homework', 'false'),
	('Lundry', 'True'),
	('Gym', 'false'),
	('Clean the bathroom', 'false'),
	('Clean my car', 'false');

SELECT * FROM "TODO";

DELETE FROM "TODO" WHERE "id" = 1;