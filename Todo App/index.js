const express = require('express');
const app = express();

const todolist = [
    {id: 1, task: {
        title: 'build a todo app',
        description:'anything...'
    }},
    {id: 2, task:{
        title: 'Study for the final😢',
        description:'anything2...'
    }}
];

app.use(express.json()); 


app.get('/api/todolist', (req, res) => {
    res.send(todolist);
});


app.get('/api/todolist/:id', (req, res) => {
    const todo = todolist.find(todo => todo.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('The todo was not found!');
    res.send(todo);
});


app.post('/api/todolist', (req, res) => {
    if (!req.body.task) return res.status(400).send('Task is required.');
    const todo = { 
        id: todolist.length + 1,
        task: req.body.task
    };
    todolist.push(todo);
    res.send(todo);
});


app.put('/api/todolist/:id', (req, res) => {
    const todo = todolist.find(todo => todo.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('The todo was not found.');
    
    todo.task = req.body.task;
    res.send(todo);
});


app.delete('/api/todolist/:id', (req, res) => {
    const todo = todolist.find(todo => todo.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('The todo was not found.');
    const index = todolist.indexOf(todo);
    todolist.splice(index, 1);
    res.send(todo);
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))