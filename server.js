const mongoose = require('mongoose');
// Removed BodyParser, is included with version 2.0 >
const cors = require('cors');
const { getCurrentUser } = require('./actions/authActions');

require('dotenv').config({ path: 'variables.env' });

// GraqhQL-Express and Apollo Server Express

const { ApolloServer } = require('apollo-server');

// TypeDefs and Resolvers
const resolvers = require('./graphql/resolvers');

const typeDefs = require('./graphql/schema');

// Database connection
mongoose.connect(process.env.MONGO_URI, {
     useUnifiedTopology: true,
     useNewUrlParser: true,
     useCreateIndex: true,
     useFindAndModify: false
})
.then(() => console.log('Connected to Database'))
.catch((err) => console.log(err))

// if (process.env.NODE_ENV === 'production') {

// }

const PORT = process.env.PORT || 4444;

const cors = {
     origin: '*',
     credentials: true
}

// los cors se pueden colocar como  '*'

const server = new ApolloServer({
     cors,
     typeDefs,
     resolvers,
     context: async ({ req }) => getCurrentUser(req)
})

server.listen(PORT).then(({url}) => console.log(`🚀  Server ready at ${url}`));