const mongoose = require('mongoose');

// Set global promise to use Node.js promises
mongoose.Promise = global.Promise;

// Set strict mode for queries
mongoose.set('strictQuery', true);

// Database URI
const uri = "mongodb+srv://myMongoDb:Abcd1234@cluster0.jmlublj.mongodb.net";

// Connect to the MongoDB database using Mongoose
mongoose.connect(uri + '/' + 'demoDb' + '?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Database is connected', 'demoDb'))
.catch((error) => console.log('Error connecting to database:', error));

// Set debug mode to log queries (optional)
mongoose.set('debug', (collectionName, method, query, doc) => {
    console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});

// Export Mongoose for use in other parts of your application
module.exports = mongoose;