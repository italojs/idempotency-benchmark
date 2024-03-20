const fastify = require('fastify')();
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

// SQLite database configuration
let db;

// Route to delete the last record with await
fastify.delete('/delete/await', async (request, reply) => {
    const result = await db.run('DELETE FROM data WHERE id = (SELECT MAX(id) FROM data)');
    if (result.changes === 0) {
        return { success: false, message: 'No records to delete' };
    }
    return { success: true, message: 'Delete with await complete' };
});

// Route to delete the last record without await
fastify.delete('/delete/no-await', async (request, reply) => {
    db.run('DELETE FROM data WHERE id = (SELECT MAX(id) FROM data)');
    return { success: true, message: 'Delete without await started' };
});
const start = async () => {
    try {
        // Open SQLite database connection
        db = await sqlite.open({
            filename: '/tmp/database.db',
            driver: sqlite3.Database,
            timeout: 5000,
        });

        // Execute table creation if not exist
        await db.exec('CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY, name TEXT)');

        // Insert 200,000 records
        // it will take a few minutes to complete
        const promises = [];
        for (let i = 0; i < 200000; i++) {
            promises.push(db.run('INSERT INTO data (name) VALUES (?)', `Row ${i}`));
        }
        await Promise.all(promises);

        // Start Fastify server after database initialization
        await fastify.listen({ port: 3000 });
        console.log('Server listening on port 3000');

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start().then(() => console.log('Server started.'));
