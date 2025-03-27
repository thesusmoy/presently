const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const { setSocket } = require('./socket/SetSockets');
const mainRoute = require('./routes/mainRoute');
let dotenv = require('dotenv');
const createConnectionToDataBase = require('./database/connectToMongoDB');

//middlewares
dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    transports: '*',
    credentials: true,
};
app.use(cors(corsOptions));

app.use('/api', mainRoute);

app.get('/', function (_req, res) {
    res.send('API is running...');
});

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.io
const io = new Server(server, {
    cors: corsOptions,
    path: '/socket.io/',
});

createConnectionToDataBase();
setSocket(io);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
