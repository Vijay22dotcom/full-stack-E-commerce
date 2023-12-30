import React, { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import {
  fetchOneUserData,
  isLoading,
  isLoadingForUpload,
  updateUserRole,
  userData,
  userDataForAdmin,
  userDataLoad,
} from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../component/Loader/Loader";
import { useAlert } from "../../contex/alert/AlertContex";
const UpdateUser = () => {
  const { id } = useParams();
  const [role, setRole] = useState("");
  const { showAlert } = useAlert();
  const { user } = useSelector(userDataForAdmin);
  const loading = useSelector(isLoading);
  const navigate = useNavigate();
  const uploadLoading = useSelector(isLoadingForUpload);
  console.log(user);
  //   console.log(user);
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOneUserData(id));
  }, []);

  const handleSubmit = async () => {
    const data = {
      role,
    };
    const datas = await dispatch(updateUserRole({ id, data })).then(
      (result) => {
        return result.payload.data;
      }
    );
    console.log(datas);
    if (datas.success) {
      showAlert("User Role updated successfully", "success");
      navigate("/admin/users");
    } else {
      showAlert("Something Went Worng", "error");
    }
  };
  return (
    <>
      <div className="flex">
        <div className="w-[20%]   max-[800px]:w-[30%]  bg-[#1C2536]  ">
          <Sidebar />
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className=" flex items-center justify-center bg-gray-100  w-[80%] p-[20px]">
            <div className="w-[70%] rounded overflow-hidden shadow-lg bg-white p-6">
              <img
                className="w-[100px] h-[100px] rounded-full mx-auto mb-4"
                src={user?.avatar?.url}
                alt={"userData.name"}
              />
              <div className="text-center">
                <h2 className="text-lg font-semibold mb-2 ">{user?.name}</h2>
                <p className="text-gray-600 mb-2 ">{user?.email}</p>
                <p className="text-gray-600 mb-2 "> Role: {user?.role}</p>
                <div className="mt-4 w-[200px] m-auto ">
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Change User Role:
                  </label>

                  <select
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Chose a Role</option>

                    <option value="user">User</option>

                    <option value="admin">Admin</option>
                  </select>
                  <div className="mt-4  w-[200px] m-auto">
                    <button
                      onClick={handleSubmit}
                      disabled={role === ""}
                      className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {uploadLoading ? "updating..." : " Update Order Status"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateUser;
