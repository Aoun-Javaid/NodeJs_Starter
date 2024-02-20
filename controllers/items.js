// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();

// Dummy in-memory database
let items = [
    { id: 1, name: 'Item 1', description: 'Description for Item 1' },
    { id: 2, name: 'Item 2', description: 'Description for Item 2' }
];

// Middleware to parse JSON bodies
// app.use(bodyParser.json());








const express = require('express');
const router = express.Router();
// const Product = require('../models/Product');

router.get('/items', (req, res) => {
    res.json(items);
});
// Get all products
router.get('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find(item => item.id === itemId);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});
router.post('/items', (req, res) => {
    const newItem = req.body;
    newItem.id = items.length + 1;
    items.push(newItem);
    let obj = {
        message:'Successfully added',
        data: newItem   }
    res.status(201).json(obj);
});

  router.put('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItem = req.body;
    let found = false;
    items = items.map(item => {
        if (item.id === itemId) {
            found = true;
            return { ...item, ...updatedItem, id: itemId };
        }
        return item;
    });
    if (found) {
        res.json({ message: 'Item updated successfully' });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});
// Get a single product by ID
router.delete('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const initialLength = items.length;
    items = items.filter(item => item.id !== itemId);
    if (items.length < initialLength) {
        res.json({ message: 'Item deleted successfully' });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

module.exports = router;