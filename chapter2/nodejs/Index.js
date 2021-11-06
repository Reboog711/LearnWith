const express = require("express");
const app = express();

// todo set up router Chapter 2
app.use(express.json());
const userController = require("./com/dotComIt/learnWith/controllers/UserController");
const router = express.Router();
router.use('/user', userController.userController);
app.use(router);
// to do end ch2 setup

app.get('/', (req, res) => {
    res.send('The Index')
})

const port = 8080;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})