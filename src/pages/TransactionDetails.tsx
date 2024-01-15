import { useNavigate, useParams } from "react-router-dom";

const TransactionDetails = () => {
  const { userId, transactionId } = useParams();
  const navigate = useNavigate();

  return (
    //to be Editable
    <div>
      <h2 className="text-2xl font-bold mb-4">Transaction Details</h2>
      <div>
        <strong>Transaction ID:</strong> {transactionId}
      </div>
      <div>
        <strong>Description:</strong> desc
      </div>
      <div>
        <strong>Amount:</strong> rs.230
      </div>
      <div>
        <strong>Date:</strong> {new Date().toUTCString()}
      </div>
      <div>
        <strong>Category:</strong> education
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 hover:bg-blue-600 mt-6"
        onClick={() => navigate(`/${userId}/Dashboard`)}
      >
        Back
      </button>
    </div>
  );
};

export default TransactionDetails;
