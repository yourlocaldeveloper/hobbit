DROP TABLE IF EXISTS habits;

CREATE TABLE habits (
  id serial PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  habit_desc VARCHAR(255),
  streak_track INT NOT NULL,
  streak_start INT NOT NULL,
  streak_end INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
)