import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, fetchMessageById } from "../../redux/slice/messageSlice";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/store";
import Loading from "../../components/common/Loading/Loading";

const AddEditContact: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [parentName, setParentName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [programOfInterest, setProgramOfInterest] = useState("");
  const [message, setMessage] = useState("");

  const { loadingStatus, error, selectedMessage } = useSelector((state: RootState) => state.messages);

  useEffect(() => {
    if (id) {
      // Fetch message data for editing
      dispatch(fetchMessageById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id && selectedMessage) {
      // Populate fields with existing message data
      setParentName(selectedMessage.ParentName || "");
      setEmailAddress(selectedMessage.EmailAddress || "");
      setPhoneNumber(selectedMessage.PhoneNumber || "");
      setStudentName(selectedMessage.StudentName || "");
      setStudentAge(selectedMessage.StudentAge || "");
      setProgramOfInterest(selectedMessage.ProgramOfIntrest || "");
      setMessage(selectedMessage.Message || "");
    }
  }, [id, selectedMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const newMessage = {
      ParentName: parentName,
      EmailAddress: emailAddress,
      PhoneNumber: phoneNumber,
      StudentName: studentName,
      StudentAge: studentAge,
      ProgramOfIntrest: programOfInterest,
      Message: message,
    };
  
    try {
      if (id) {
        // Dispatch edit action (if editing is implemented)
        // await dispatch(editMessage({ id, newMessage }));
      } else {
        // Dispatch create action and wait for completion
        await dispatch(createMessage(newMessage));
      }
      // Navigate to the contact page after successful submission
      navigate("/contact-messages");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  

  return (
    <Loading status={loadingStatus} error={error}>
      <div className="min-h-screen flex flex-col justify-start p-8">
        <h1 className="text-3xl font-bold mb-8 text-dimBlack text-center">
          {id ? "Edit Contact Message" : "Add New Contact Message"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto w-full">
          <div>
            <label className="block text-dimBlack font-medium mb-2">Parent Name:</label>
            <input
              type="text"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              required
              className="w-full p-4 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
            />
          </div>
          <div>
            <label className="block text-dimBlack font-medium mb-2">Email Address:</label>
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              required
              className="w-full p-4 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
            />
          </div>
          <div>
            <label className="block text-dimBlack font-medium mb-2">Phone Number:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full p-4 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
            />
          </div>
          <div>
            <label className="block text-dimBlack font-medium mb-2">Student Name:</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
              className="w-full p-4 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
            />
          </div>
          <div>
            <label className="block text-dimBlack font-medium mb-2">Student Age:</label>
            <input
              type="number"
              value={studentAge}
              onChange={(e) => setStudentAge(e.target.value)}
              required
              className="w-full p-4 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
            />
          </div>
          <div>
            <label className="block text-dimBlack font-medium mb-2">Program of Interest:</label>
            <input
              type="text"
              value={programOfInterest}
              onChange={(e) => setProgramOfInterest(e.target.value)}
              required
              className="w-full p-4 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
            />
          </div>
          <div>
            <label className="block text-dimBlack font-medium mb-2">Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full p-4 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg h-40"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4 mt-8">
          <button
                type="button"
                onClick={() => navigate("/contact-messages")}
                className="px-5 py-2 bg-Grey_40 text-white font-medium rounded-lg hover:bg-Grey_60 transition-all mb-6"
                >
                Cancel
                </button>

            <button
              type="submit"
              className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-orange-500 transition-all mb-6"
            >
              {id ? "Update Message" : "Add Message"}
            </button>
          </div>
        </form>
      </div>
    </Loading>
  );
};

export default AddEditContact;
