const express = require('express');
const path = require('path')
const {ApolloServer} = require('apollo-server-express');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
require('dotenv').config();

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers.js')
const {getUserFromAuthHeader} = require('./utils/helpers')

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async({req}) => {
        const currentUser = await getUserFromAuthHeader(req);
        return {...req, currentUser}
    }
})

const app = express();

app.use(cookieParser());
app.use((error, req, res, next) => {
    console.log(error);
})
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

apollo.applyMiddleware({app});

mongoose
    .connect(process.env.MONGO_DB_URI, {useNewUrlParser: true, useFindAndModify: false})
    .then(() => {
        app.listen(process.env.PORT || 5000);
        console.log(`Server listening on port ${process.env.PORT || 5000}`)
    })
    .catch(error => {
        console.log(`Connection error`);
        console.log(error)
    })