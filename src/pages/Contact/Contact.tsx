import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, deleteMessage } from "../../redux/slice/messageSlice";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/store";
import Loading from "../../components/common/Loading/Loading";
import { useNavigate } from "react-router-dom";

const Contact: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); // Hook to navigate to other routes
  const { messages, loadingStatus, error } = useSelector((state: RootState) => state.messages);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteMessage(id));
  };

  const handleAddMessage = () => {
    navigate("/add-edit-contact"); // Navigate to the Add/Edit page
  };

  return (
    <Loading status={loadingStatus} error={error}>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>

        {/* Add Message Button */}
        <button
          onClick={handleAddMessage}
          className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-orange-500 transition-all mb-6"
        >
          Add New Message
        </button>

        {/* Table displaying messages */}
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Parent Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Phone</th>
              <th className="border border-gray-300 px-4 py-2">Message</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id}>
                <td className="border border-gray-300 px-4 py-2">{msg.ParentName}</td>
                <td className="border border-gray-300 px-4 py-2">{msg.EmailAddress}</td>
                <td className="border border-gray-300 px-4 py-2">{msg.PhoneNumber}</td>
                <td className="border border-gray-300 px-4 py-2">{msg.Message}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Loading>
  );
};

export default Contact;
