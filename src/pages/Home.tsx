import React, { useState } from "react";
import ChartDispaly from "../components/ChartDispaly";
import TransctionList from "../components/TransctionList";
import { useNavigate, useParams } from 'react-router-dom';

export interface Transaction {
  transactionId: number;
  description: string;
  amount: number;
  date: Date;
  category: Category;
}

export interface Category {
  categoryId: number;
  categoryName: string;
}

const categories: Category[] = [
  { categoryId: 1, categoryName: "Education" },
  { categoryId: 2, categoryName: "Fun" },
  { categoryId: 3, categoryName: "Food" },
  { categoryId: 4, categoryName: "Trading" },
  { categoryId: 5, categoryName: "Friend" },
  { categoryId: 6, categoryName: "Others" },
];

const Home: React.FC = () => {
  const navigate=useNavigate();
  const { userId }=useParams();
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [editingBudget, setEditingBudget] = useState<boolean>(false);

  const [newTransactionDescription, setNewTransactionDescription] =
    useState<string>("");
  const [newTransactionAmount, setNewTransactionAmount] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      transactionId: 1,
      description: "Groceries",
      amount: 50,
      date: new Date("2000-01-01"),
      category: { categoryName: "Education", categoryId: 1 },
    },
    {
      transactionId: 2,
      description: "Salary",
      amount: 2000,
      date: new Date("2000-01-02"),
      category: { categoryName: "Trading", categoryId: 4 },
    },
  ]);
  const [budget, setBudget] = useState<number>(0);
  const [bugetError,setBudgetError]=useState(false);
  const handleAddTransaction = (): void => {
    const trimmedDescription: string = newTransactionDescription.trim();
    const parsedAmount: number = parseFloat(newTransactionAmount.toString());

    if (trimmedDescription && !isNaN(parsedAmount) && selectedCategory) {
      if(budget-parsedAmount<0){
        setBudgetError(true);
      }else{
        const newTransaction: Transaction = {
          transactionId: transactions.length + 1,
          description: trimmedDescription,
          amount: parsedAmount,
          date: new Date(),
          category: selectedCategory,
        };
        setBudget(budget-parsedAmount);
        setTransactions([...transactions, newTransaction]);
        setNewTransactionDescription("");
        setNewTransactionAmount(0);
        setSelectedCategory(null);
      }
    }
  };
  const handleEditBudget = (): void => {
    setEditingBudget(!editingBudget);
  };
  const handleSaveBudget = (): void => {
    if (!isNaN(parseFloat(budget.toString()))) {
      setEditingBudget(false);
    }
  };
  return (
    <div className="container mx-auto flex flex-col lg:flex-row justify-evenly">
      <div className="max-w-max mx-auto bg-white p-8 border border-gray-300 rounded-md shadow-md basis-3/5">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

        <div className="mb-4">
          <p>
            <strong>Username:</strong> John Doe
          </p>
          <p>
            <strong>Total Transactions:</strong> {transactions.length}
          </p>
          {editingBudget ? (
            <div className="mb-4">
              <label
                htmlFor="editedBudget"
                className="block text-sm font-medium text-gray-600"
              >
                Edited Budget
              </label>
              <input
                type="number"
                id="editedBudget"
                name="editedBudget"
                value={budget}
                onChange={(e) => setBudget(parseFloat(e.target.value))}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
              />
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md ml-2 hover:bg-green-600 mt-2"
                onClick={handleSaveBudget}
              >
                Save
              </button>
            </div>
          ) : (
            <p>
              <strong>Budget:</strong> ${budget}{" "}
              <button
                className="text-blue-500 hover:underline ml-2 cursor-pointer"
                onClick={handleEditBudget}
              >
                Edit
              </button>
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="newTransactionDescription"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <input
            type="text"
            id="newTransactionDescription"
            name="newTransactionDescription"
            value={newTransactionDescription}
            onChange={(e) => setNewTransactionDescription(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          {bugetError && <span className="text-red-600">*Budegt is low</span>}
          <label
            htmlFor="newTransactionAmount"
            className="block text-sm font-medium text-gray-600"
          >
            Amount
          </label>
          <input
            type="number"
            id="newTransactionAmount"
            name="newTransactionAmount"
            value={newTransactionAmount}
            onChange={(e) =>
              setNewTransactionAmount(parseFloat(e.target.value))
            }
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="categoryDropdown"
            className="block text-sm font-medium text-gray-600"
          >
            Category
          </label>
          <select
            id="categoryDropdown"
            name="categoryDropdown"
            value={selectedCategory?.categoryId || ""}
            onChange={(e) => {
              const categoryId = parseInt(e.target.value);
              const selected = categories.find(
                (category) => category.categoryId === categoryId
              );
              setSelectedCategory(selected || null);
            }}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-600 mr-1"
          onClick={handleAddTransaction}
        >
          Add New Transaction
        </button>

        <button 
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-600 mr-1"
        onClick={()=>navigate(`/${userId}/Budget`)}
        >
          Monthly track
        </button>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-600"
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory
            ? "Hide Transaction History"
            : "Show Transaction History"}
        </button>

        {showHistory && (
          <TransctionList transactions={transactions}/>
        )}
      </div>
      <div className="flex flex-wrap justify-center basis-2/5 mr-12">
        <ChartDispaly transactions={transactions} categories={categories} />
      </div>
    </div>
  );
};

export default Home;
