
-- seeding channel info placeholder for now; 
-- v.2 will have more channels user-created;

INSERT INTO channel (name, description) VALUES ('Java General', 'Whatever is on your mind about Java');
INSERT INTO channel (name, description) VALUES ('Frontend Frameworks', 'Angular, React, Vue, Svelte, etc. discussions');
INSERT INTO channel (name, description) VALUES ('Spring Security', 'How to secure your Spring Boot application and more');

-- Insert users
INSERT INTO user (user_name, password, first_name, last_name) VALUES ('johnDoe', 'Abc&123!', 'John', 'Doe');
INSERT INTO user (user_name, password, first_name, last_name) VALUES ('janeDoe', 'Abc&123!', 'Jane', 'Doe');
INSERT INTO user (user_name, password, first_name, last_name) VALUES ('samSmith', 'Abc&123!', 'Sam', 'Smith');
INSERT INTO user (user_name, password, first_name, last_name) VALUES ('lisaRay', 'Abc&123!', 'Lisa', 'Ray');
INSERT INTO user (user_name, password, first_name, last_name) VALUES ('mikeBrown', 'Abc&123!', 'Mike', 'Brown');

Insert INTO user (user_name, password, first_name, last_name) VALUES ('MegaMan', 'Abc&123!', 'Mega', 'Man');
Insert INTO user (user_name, password, first_name, last_name) VALUES ('IronMan', 'Abc&123!', 'Iron', 'Man');
Insert INTO user (user_name, password, first_name, last_name) VALUES ('SpiderMan', 'Abc&123!', 'Spider', 'Man');
Insert INTO user (user_name, password, first_name, last_name) VALUES ('BatMan', 'Abc&123!', 'Bat', 'Man');
