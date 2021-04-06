const db = require('../dbConfig/init');
const SQL = require('sql-template-strings');

class Habit {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.desc = data.habit_desc;
    this.frequency = data.frequency;
    this.userId = data.user_id;
  }

  static findByUserId(user_id) {
    return new Promise (async (resolve,reject) => {
      try{
        const result = await db.query(SQL`SELECT * FROM habits WHERE user_id = ${user_id};`);
        const habit = new Habit(result.rows[0]);
        resolve(habit)
      } catch (error) {
        reject('Could not find habit');
      }
    });
  }

  static create(name, habit_desc, frequency) {
    return new Promise (async (resolve,reject) => {
      try{
        const result = await db.query(SQL`INSERT INTO habits (name, habit_desc, frequency) VALUES (${name}, ${habit_desc}, ${frequency}) RETURNING *;`);
        const habit = new Habit(result.rows[0]);
        resolve(habit)
      } catch (error) {
        reject('Could not create habit');
      }
    });
  }

  destroy() {
    return new Promise (async (resolve, reject) => {
      try {
        const result = await db.query(SQL`DELETE FROM habits where id = ${this.id}`);
        resolve("Habit was deleted")
      } catch (error) {
        reject('Could not delete habit')
      }

  }
}