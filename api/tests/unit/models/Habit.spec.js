const Habit = require('../../../models/Habit');
const pg = require('pg');
jest.mock('pg');

const db = require('../../../dbConfig/init');

describe('Habit', () => {
    beforeEach(() => jest.clearAllMocks())
    
    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        test('it resolves with habits on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ rows: [{}, {}, {}]});
            const all = await Habit.all;
            expect(all).toHaveLength(3)
        })
    });

    describe('findByHabitId', () => {
        test('it resolves with habit on successful db query', async () => {
            let habitData = { id: 1, name: "Drink water" , desc: "Drink 8 cups of water a day", frequency: "Daily", userId: 1 }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ habitData] });
            const result = await Habit.findByHabitId(1);
            expect(result).toBeInstanceOf(Habit)
        })
    });

    describe('findByUserId', () => {
        test('it resolves with habits of user on successful db query', async () => {
            let habitData = { id: 1, name: "Drink water" , desc: "Drink 8 cups of water a day", frequency: "Daily", userId: 1 }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [ habitData] });
            const result = await Habit.findByUserId(1);
            expect(result).toBeInstanceOf(Habit)
        })
    });

    describe('create', () => {
        test('it resolves with habit on successful db query', async () => {
            let habitData = { name: "Drink water" , habit_desc: "Drink 8 cups of water a day", frequency: "Daily" }
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [{...habitData, id: 1}]});
            const result = await Habit.create(habitData);
            expect(result).toHaveProperty('id')
        })
    });

    describe('destroy', () => {
        test('it resolves with message on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({ id: 1 });
            let testHabit = new Habit({ id: 1, name: "Drink water" , desc: "Drink 8 cups of water a day", frequency: "Daily", userId: 1 })
            const result = await testHabit.destroy();
            expect(result).toBe('Habit was deleted')
        })
    });
})