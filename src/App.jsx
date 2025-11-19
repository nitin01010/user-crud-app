import React, { useEffect, useState } from 'react'
import { handleUserCreate, handleUserDelete, handleUserGET, handleUserUpdate } from './api/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import UserCard from './components/userCard';
import { FallingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import UserModal from './components/userModal';

const App = () => {
  const [showModal, setShoModal] = useState(false);
  const [updateId, setUpdateId] = useState();
  const { isPending, error, data } = useQuery({
    queryKey: ['userData'],
    queryFn: () => handleUserGET("https://jsonplaceholder.typicode.com/users")
  });

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (data) setUsers(data);
  }, [data]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const queryClient = useQueryClient();

  const { mutate: deleteUser } = useMutation({
    mutationFn: (id) =>
      handleUserDelete(`https://jsonplaceholder.typicode.com/users/${id}`),
    onSuccess: (_, id) => {
      setUsers(prev => prev.filter(u => u.id !== id));
      toast.success("User deleted!");
      queryClient.invalidateQueries(["userData"]);
    },
    onError: () => {
      toast.error("Delete failed");
    }
  });

  const { mutate: createUser } = useMutation({
    mutationFn: (newUser) => handleUserCreate("https://jsonplaceholder.typicode.com/users", newUser),
    onSuccess: (created) => {
      setUsers(prev => [...prev, created]);
      toast.success("User created!");
      queryClient.invalidateQueries(["userData"]);
    },
    onError: () => {
      toast.error("Create failed");
    }
  });

  const { mutate: updateUser } = useMutation({
    mutationFn: ({ id, userData }) =>
      handleUserUpdate(`https://jsonplaceholder.typicode.com/users/${id}`, userData),
    onSuccess: (updated, variables) => {
      setUsers(prev => prev.map(u => (u.id === variables.id ? updated : u)));
      toast.success("User updated!");
      queryClient.invalidateQueries(["userData"]);
    },
    onError: () => {
      toast.error("Update failed");
    }
  });

  if (isPending) {
    return (
      <div className="h-screen flex justify-center items-center">
        <FallingLines color="#4fa94d" width="100" visible={true} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center text-red-600 text-xl">
        Failed to load users...
      </div>
    );
  }

  return (
    <div className='bg-white py-20 min-h-screen'>
      <div className='flex justify-end mb-5 px-18 gap-5'>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder='search here'
          className='w-[250px] border-none shadow rounded-md px-3 outline-none p-2 bg-[#f2f2f2]'
        />
        <button
          className='w-[100px] bg-yellow-400 rounded-sm'
          onClick={() => { setUpdateId(null); setShoModal(true); }}
        >
          Add User
        </button>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center text-xl font-semibold text-gray-500 py-10">
          No user found
        </div>
      ) : (
        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
          {filteredUsers.map(item => (
            <li key={item.id}>
              <UserCard
                data={item}
                deleteUser={deleteUser}
                setShoModal={setShoModal}
                setUpdateId={setUpdateId}
              />
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <UserModal
          updateId={updateId}
          updateUser={updateUser}
          createUser={createUser}
          setShoModal={setShoModal}
        />
      )}
    </div>
  );
}

export default App;
