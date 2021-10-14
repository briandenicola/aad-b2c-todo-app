const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

exports.getAllTodos = (req, res) => {

    const adapter = new FileSync('./data/db.json');
    const db = lowdb(adapter);
    const todos = db.get('todos')
        .value();

    res.status(200).send(todos);
}