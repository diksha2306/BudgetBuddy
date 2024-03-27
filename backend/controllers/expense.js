const Expense = require("../models/expenseModel");

const addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are mandatory !" });
    }
    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be positive !" });
    }
    const expense = new Expense({
      title,
      amount,
      date,
      category,
      description,
      user: req.user._id,
    });
    const savedexpense = await expense.save();
    res.status(200).json(savedexpense);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  const expense = await Expense.findById(id);

  if (expense.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't modify this expense");
  }
  if (expense) {
    await Expense.deleteOne({ _id: id });
    res.json({ message: "Expense deleted" });
  } else {
    res.status(404);
    throw new Error("Expense not found");
  }
};

module.exports = { addExpense, getExpenses, deleteExpense };
