import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFAQ } from "../../redux/faq/faqAct";
import { RootState, AppDispatch } from "../../redux/store";
import Loading from "../../components/common/Loading/Loading";
import { useNavigate } from "react-router-dom";

const FAQPage: React.FC = () => {
  const navigate = useNavigate();
  const { faqs, loading, error } = useSelector(
    (state: RootState) => state.faqs
  );
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = (id: string) => {
    dispatch(removeFAQ(id));
  };

  return (
    <Loading
      status={loading ? "Pending" : error ? "Fail" : "Success"}
      error={error}
    >
      <div className="w-full mt-4">
        <button
          onClick={() => navigate("/add-faq")}
          className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-orange-500 transition-all mb-6"
        >
          Add New FAQ
        </button>
        {faqs.length === 0 ? (
          <p>No FAQs found.</p>
        ) : (
          <div className="flex justify-center items-center w-full px-4">
            <div className="w-full  bg-white shadow-lg rounded-lg overflow-hidden">
              <table className=" divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Question
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Answer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {faqs.map((faq) => (
                    <tr
                      key={faq._id}
                      className="hover:bg-gray-50 transition-all"
                    >
                      <td className="px-6 py-4  text-sm font-medium text-gray-900">
                        {faq.question}
                      </td>
                      <td className="px-6 py-4  text-sm text-gray-500">
                        {faq.answer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => navigate(`/faq/${faq._id}`)}
                            className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-orange-500 transition-all"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(faq._id)}
                            className="px-4 py-2 bg-red-400 text-white font-medium rounded-lg hover:bg-red-500 transition-all"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Loading>
  );
};

export default FAQPage;
