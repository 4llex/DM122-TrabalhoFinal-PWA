let db;

export default class MarketService {
    constructor(){
        this.initializeDB();
    }

    initializeDB(){
        db = new Dexie('marketDB');

        db.version(1).stores({
            tasks: '++id, description'
        });


        db.on('populate', async () => {
            await db.tasks.bulkPut([
                {description: 'Coca-Cola', done: false},
                {description: 'Azeite', done: true},
                {description: 'Laranja', done: true},
                {description: 'Pão', done: false},
                {description: 'Carne', done: false},
            ]);
        });

    }

    getAll() {
        return db.tasks.toArray();
    }

}