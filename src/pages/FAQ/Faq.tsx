import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFAQs, createFAQ, editFAQ, removeFAQ } from "../../redux/faq/faqAct";
import { RootState, AppDispatch } from "../../redux/store";

const FAQPage: React.FC = () => {
  const { faqs, loading, error } = useSelector((state: RootState) => state.faqs);
  const dispatch = useDispatch<AppDispatch>();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editingFAQ, setEditingFAQ] = useState<{ _id: string; question: string; answer: string } | null>(null);

  // fetch Faqs from redux
  useEffect(() => {
    dispatch(fetchFAQs());
  }, [dispatch]);

  // Handle form submission for adding or updating faqs
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingFAQ) {
      // Update faq
      dispatch(editFAQ({ id: editingFAQ._id, faq: { question, answer } }));
    } else {
      // Add faq
      dispatch(createFAQ({ question, answer }));
    }

    // Reset form
    setQuestion("");
    setAnswer("");
    setEditingFAQ(null);
  };

  // Handle editing a faq
  const handleEdit = (faq: { _id: string; question: string; answer: string }) => {
    setEditingFAQ(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
  };

  // Handle deleting a faq
  const handleDelete = (id: string) => {
    dispatch(removeFAQ(id));
  };

  if (loading) return <p>Loading FAQs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>FAQ Management</h1>

      {/* Form for Adding and editing the faqs */}
      
      <form onSubmit={handleSubmit} className="flex items-center justify-around">
        <h2>{editingFAQ ? "Edit FAQ" : "Add a new FAQ"}</h2>
        <div>
          <label>Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="border-2"
          />
        </div>

        <div>
          <label>Answer</label>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            className="border-2"
          ></textarea>

        </div>
        <button type="submit"  className="ml-2 bg-orange-300 p-2 rounded">{editingFAQ ? "Update FAQ" : "Add FAQ"}</button>
        {editingFAQ && (
          <button className="ml-2 bg-orange-200" type="button" onClick={() => setEditingFAQ(null)}>
            Cancel
          </button>
        )}
      </form>

      {/* List of faqs */}
      <h2>All FAQs</h2>
      {faqs.length === 0 ? (
        <p>No FAQs found.</p>
      ) : (
        <ul>
          {faqs.map((faq) => (
            <li key={faq._id} className="pt-12">
              <strong>{faq.question}</strong>: {faq.answer}
              <div className="flex items-start gap-5 flex-col mt-4">
                <button onClick={() => handleEdit(faq)} className="bg-orange-300 p-2">
                  Edit FAQ
                </button>
                <button onClick={() => handleDelete(faq._id)} className="bg-orange-300 p-2">
                  Delete FAQ
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FAQPage;
