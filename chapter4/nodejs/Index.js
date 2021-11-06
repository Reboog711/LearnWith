const express = require("express");
const app = express();

app.use(express.json());
const userController = require("./com/dotComIt/learnWith/controllers/UserController");
const router = express.Router();
router.use('/user', userController.userController);

const tasksController = require("./com/dotComIt/learnWith/controllers/TasksController");
router.use('/tasks', tasksController.tasksController);

const taskCategoriesController = require("./com/dotComIt/learnWith/controllers/TaskCategoriesController");
router.use('/taskcategories', taskCategoriesController.taskCategoriesController);

app.use(router);

app.get('/', (req, res) => {
    res.send('The Index')
})

const port = 8080;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})