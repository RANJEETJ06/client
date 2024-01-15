import { Transaction } from "../pages/Home";

interface TransctionListProps {
  transactions: Transaction[];
}
const TransctionList: React.FC<TransctionListProps> = ({ transactions }) => {
  return (
    <div>
  <h3 className="text-lg font-semibold mb-2">Transaction History</h3>
  <table className="table-auto ml-0">
    <thead>
      <tr>
        <th className="px-2 py-2">Transaction ID</th>
        <th className="px-4 py-2">Description</th>
        <th className="px-4 py-2">Category</th>
        <th className="px-4 py-2">Amount</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map((transaction) => (
        <tr key={transaction.transactionId} className="mb-2">
          <td className="border px-2 py-2">{transaction.transactionId}</td>
          <td className="border px-4 py-2">{transaction.description}</td>
          <td className="border px-4 py-2">{transaction.category.categoryName}</td>
          <td className="border px-4 py-2">₹{transaction.amount}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default TransctionList;
