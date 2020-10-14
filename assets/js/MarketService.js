const db = new Dexie('marketDB');

db.version(1).stores({
    tasks: '++id, description, done'
});


db.on('populate', async () => {
    await db.tasks.bulkPut([
        {description: 'Coca-Cola', done: false},
        {description: 'Azeite', done: false},
        {description: 'Laranja', done: false},
        {description: 'Pão', done: false},
        {description: 'Carne', done: false},
    ]);
});


async function list(){
    db.tasks.each(task => console.log(task));

    const taskTypeScript = await db.tasks.get(2);
    taskTypeScript.done = true;
    db.tasks.put(taskTypeScript);

    const tasksDone = await db.tasks    
        .where('description').equals('Carne').first();
    console.log('Query', tasksDone);
}

list();