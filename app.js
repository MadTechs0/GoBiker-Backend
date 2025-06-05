const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./src/routes/routes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/', routes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Database connection error:', err));

const PORT = 5000 || process.env.PORT;
app.listen(PORT,'0.0.0.0', () => console.log(`server running on port ${PORT}`));