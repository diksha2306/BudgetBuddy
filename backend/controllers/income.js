const Income = require("../models/incomeModel");

const addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  console.log(req.user._id);

  // console.log(income);

  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are mandatory !" });
    }
    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be positive !" });
    }
    const income = new Income({
      title,
      amount,
      date,
      category,
      description,
      user: req.user._id,
    });
    const savedincome = await income.save();
    res.status(200).json(savedincome);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteIncome = async (req, res) => {
  const { id } = req.params;
  const income = await Income.findById(id);

  if (income.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't modify this income");
  }

  if (income) {
    await Income.deleteOne({ _id: id });
    res.json({ message: "Income deleted" });
  } else {
    res.status(404);
    throw new Error("Income not found");
  }
};

module.exports = { addIncome, getIncomes, deleteIncome };
