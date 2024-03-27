const {
  addExpense,
  getExpenses,
  deleteExpense,
} = require("../controllers/expense");
const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/income");
const { protect } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.route("/add-income").post(protect, addIncome);
router.route("/get-incomes").get(protect, getIncomes);
router.route("/delete-income/:id").delete(protect, deleteIncome);
router.route("/add-expense").post(protect, addExpense);
router.route("/get-expenses").get(protect, getExpenses);
router.route("/delete-expense/:id").delete(protect, deleteExpense);

module.exports = router;
