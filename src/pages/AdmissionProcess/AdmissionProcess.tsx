import { useEffect } from "react";
import MainContent from "../../components/common/MainContent/MainContent";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  deleteAdmissionProcess,
  getAllAdmissionProcess,
} from "../../redux/slice/admissionProcess/admissionProcessSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdmissionProcess = () => {
  const dispatch = useAppDispatch();

  // Info From Slice
  const { admissionProcess, isLoading, error } = useAppSelector(
    (state) => state.admissionProcessSlice
  );

  useEffect(() => {
    dispatch(getAllAdmissionProcess());
  }, [dispatch]);


  const navigate = useNavigate();

  // Function To Handle Delete Item
  const handleDelete = (id: string) => {
    dispatch(deleteAdmissionProcess(id as string));
    if (!error) {
      toast.success("item deleted successfully");
    } else {
      toast.error("try again");
    }
  };

  return (
    <MainContent status={isLoading} error={error} to="admissionProcess">
      <div>
        <div className="flex justify-center items-center w-full px-4">
          <div className="w-full  bg-white shadow-lg rounded-lg overflow-hidden">
            <table className=" divide-y divide-gray-200 w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    step
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {admissionProcess.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-all"
                  >
                    <td className="px-6 py-4  text-sm font-medium text-gray-900">
                      {item.step}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            navigate(`/admissionProcess/update/${item._id}`)
                          }
                          className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-orange-500 transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
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
      </div>
    </MainContent>
  );
};

export default AdmissionProcess;
