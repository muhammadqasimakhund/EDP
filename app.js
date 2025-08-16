import express from 'express';
import { logger } from './middleware/logger.js';
import day6Router from './routes/06.js';

const app = express();
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(logger)

app.get('/', (req, res) => {
    res.send("Api is working Successfully");
})

app.use("/day", day6Router)

app.listen(3000, () => {
    console.log("Server is listening on http://localhost:" + 3000);
})