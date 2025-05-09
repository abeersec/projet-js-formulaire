const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
const examRoutes = require('./routes/examRoutes');
const postsRouter = require('./routes/postsRouter');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors({ origin: '*' }));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

console.log('MONGODB_URI:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error('Erreur MongoDB:', err));


app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/exams', examRoutes);
app.use('/api/posts', postsRouter);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});


module.exports = app;