import React from "react";

const UserModal = ({ setShoModal, createUser, updateUser, updateId }) => {
  const isUpdate = !!updateId; 

  return (
    <div className="fixed inset-0 bg-yellow-400 bg-opacity-10 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] sm:w-[400px] p-6 rounded-lg shadow-xl">

        {/* Title */}
        <h2 className="text-xl font-bold mb-4 text-center">
          {isUpdate ? "Update User" : "Create User"}
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            const userData = {
              name: e.target.name.value,
              username: e.target.username.value,
              email: e.target.email.value,
            };

            if (isUpdate) {
              updateUser({ id: updateId.id, userData });
            } else {
              createUser(userData);
            }

            setShoModal(false);
          }}
        >
          <div className="flex flex-col gap-3">

            <input
              name="name"
              type="text"
              defaultValue={updateId?.name || ""}
              placeholder="Enter full name"
              className="p-3 border rounded-md bg-gray-100 outline-none shadow"
            />

            <input
              name="username"
              type="text"
              defaultValue={updateId?.username || ""}
              placeholder="Enter username"
              className="p-3 border rounded-md bg-gray-100 outline-none shadow"
            />

            <input
              name="email"
              type="email"
              defaultValue={updateId?.email || ""}
              placeholder="Enter email"
              className="p-3 border rounded-md bg-gray-100 outline-none shadow"
            />

          </div>

          <div className="flex justify-between mt-5">
            <button
              type="button"
              onClick={() => setShoModal(false)}
              className="w-[48%] bg-gray-300 p-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-[48%] bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              {isUpdate ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
