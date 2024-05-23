
-- seeding channel info placeholder for now; 
-- v.2 will have more channels user-created;

INSERT INTO channel (name, description) VALUES ('Java General', 'Whatever is on your mind about Java');
INSERT INTO channel (name, description) VALUES ('Frontend Frameworks', 'Angular, React, Vue, Svelte, etc. discussions');
INSERT INTO channel (name, description) VALUES ('Spring Security', 'How to secure your Spring Boot application and more');

-- Insert users
INSERT INTO user (user_name, password, first_name, last_name) VALUES ('demoUser', 'Abc&123!', 'Demo', 'User');
INSERT INTO user (user_name, password, first_name, last_name) VALUES ('johnDoe', 'Abc&123!', 'John', 'Doe');
INSERT INTO user (user_name, password, first_name, last_name) VALUES ('samSmith', 'Abc&123!', 'Sam', 'Smith');
INSERT INTO user (user_name, password, first_name, last_name) VALUES ('lisaRay', 'Abc&123!', 'Lisa', 'Ray');
INSERT INTO user (user_name, password, first_name, last_name) VALUES ('mikeBrown', 'Abc&123!', 'Mike', 'Brown');

Insert INTO user (user_name, password, first_name, last_name) VALUES ('MegaMan', 'Abc&123!', 'Mega', 'Man');
Insert INTO user (user_name, password, first_name, last_name) VALUES ('IronMan', 'Abc&123!', 'Iron', 'Man');
Insert INTO user (user_name, password, first_name, last_name) VALUES ('SpiderMan', 'Abc&123!', 'Spider', 'Man');
Insert INTO user (user_name, password, first_name, last_name) VALUES ('BatMan', 'Abc&123!', 'Bat', 'Man');

-- Insert channel messages as Java General Channel messsage seed data
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('I love working with Java streams!', 1, 1, '2024-05-23 10:15:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('Has anyone tried Java 17 yet?', 1, 2, '2024-05-23 10:20:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('Yes, the new features in Java 17 are great!', 1, 3, '2024-05-23 10:25:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('I am currently migrating my project to Java 17.', 1, 4, '2024-05-23 10:30:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('What do you guys think about Project Loom?', 1, 5, '2024-05-23 10:35:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('Project Loom is a game-changer for concurrent programming in Java.', 1, 6, '2024-05-23 10:40:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('Any tips for debugging Java applications?', 1, 7, '2024-05-23 10:45:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('I recommend using VisualVM for performance tuning.', 1, 8, '2024-05-23 10:50:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('What are your favorite Java libraries?', 1, 9, '2024-05-23 10:55:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('I really like using Lombok for reducing boilerplate code.', 1, 6, '2024-05-23 11:00:00');

--Insert channel messages as Frontend Frameworks Channel messsage seed data
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('Angular vs React, which one do you prefer?', 2, 1, '2024-05-23 11:05:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('I prefer React for its flexibility.', 2, 2, '2024-05-23 11:10:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('Vue has a gentle learning curve, great for beginners.', 2, 3, '2024-05-23 11:15:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('Anyone tried Svelte? It looks promising.', 2, 4, '2024-05-23 11:20:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('Svelte has great performance and simplicity.', 2, 5, '2024-05-23 11:25:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('What frontend framework are you using for your current project?', 2, 6, '2024-05-23 11:30:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('I am using Angular for its comprehensive toolset.', 2, 7, '2024-05-23 11:35:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('React hooks are amazing for managing state.', 2, 8, '2024-05-23 11:40:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('How do you handle state management in Vue?', 2, 9, '2024-05-23 11:45:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('I use Vuex for state management in Vue.', 2, 10, '2024-05-23 11:50:00');

--Insert channel messages as Spring Security Channel messsage seed data
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('How do you handle authentication in Spring Boot?', 3, 1, '2024-05-23 11:55:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('I use Spring Security with JWT for authentication.', 3, 2, '2024-05-23 12:00:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('What are the best practices for securing REST APIs?', 3, 3, '2024-05-23 12:05:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('Always validate input and use HTTPS.', 3, 4, '2024-05-23 12:10:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('How do you implement role-based access control?', 3, 5, '2024-05-23 12:15:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('Use Spring Security annotations like @PreAuthorize.', 3, 6, '2024-05-23 12:20:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('What is your approach to password hashing?', 3, 7, '2024-05-23 12:25:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('I use BCrypt for password hashing.', 3, 8, '2024-05-23 12:30:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('Any tips for securing OAuth2 implementations?', 3, 9, '2024-05-23 12:35:00');
INSERT INTO chat (message, channel_id, user_id, published_at) VALUES ('Follow the latest OAuth2 specs and use well-maintained libraries.', 3, 10, '2024-05-23 12:40:00');
