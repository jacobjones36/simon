const {MongoClient} = require('mongodb');

const userName = process.env.cs260;
const password = process.env.cs260password;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
    throw Error('Database not configured. Set environment variables');
}
const url = `mongodb+srv://cs260:cs260password@cluster0.xsgxmzv.mongodb.net/`;

const client = new MongoClient(url);
const scoreCollection = client.db('simon').collection('score');

function addScore(score){
    scoreCollection.insertOne(score);
}
function getHighScores(){
    const query = {score: {$gt: 0}};
    const options = {
        sort: {score: -1},
        limit: 10,
    };
    const cursor = scoreCollection.find(query, options);
    return cursor.toArray();
}
module.exports = {addScore, getHighScores};