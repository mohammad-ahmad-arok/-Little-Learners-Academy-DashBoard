import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { createFAQ, editFAQ } from "../../redux/faq/faqAct";

const AddEditFaq = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();

  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id) {
      dispatch(editFAQ({ id: id, faq: { question, answer } }));
    } else {
      dispatch(createFAQ({ question, answer }));
    }

    navigate("/faq");
  };

  return (
    <div className="min-h-screen flex flex-col justify-start p-8">
      <h1 className="text-3xl font-bold mb-8 text-dimBlack text-center">
        {id ? "Edit FAQ" : "Add New FAQ"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-4xl mx-auto w-full"
      >
        <div>
          <label className="block text-dimBlack font-medium mb-2">
            question:
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="w-full p-4 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
          />
        </div>
        <div>
          <label className="block text-dimBlack font-medium mb-2">
            answer:
          </label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
            className="w-full p-4 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg h-40"
          ></textarea>
        </div>
        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={() => navigate("/faq")}
            className="px-5 py-2 bg-Grey_40 text-white font-medium rounded-lg hover:bg-Grey_60 transition-all mb-6"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-orange-500 transition-all mb-6"
          >
            {id ? "Update FAQ" : "Add FAQ"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditFaq;
