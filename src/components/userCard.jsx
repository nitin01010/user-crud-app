import React from 'react'

const UserCard = ({ data, deleteUser, setUpdateId, setShoModal }) => {
    const handleUpdate = (value) => {
        setUpdateId(value);
        setShoModal(true)
    }
    return (
        <div key={data.id} className=' bg-yellow-300 hover:bg-yellow-400 border-none rounded-md overflow-hidden p-5 shadow m-auto w-[80%]  sm:w-[250px] '>
            <p>{data.id}</p>
            <div className=' w-[70px] h-[70px] m-auto bg-white rounded-full'></div>
            <p className=' text-center mt-2 font-bold'>{data.name}</p>
            <p className=' text-center mt-2'>{data.email}</p>
            <p className=' text-center mt-2'>{data.phone}</p>
            <div className=' flex gap-4 mt-5'>
                <button onClick={() => deleteUser(data.id)} className=' w-[50%] capitalize cursor-pointer mt-2 h-[30px] rounded-sm bg-red-700 text-white'>Delete</button>
                <button onClick={() => handleUpdate(data)} className=' w-[50%] capitalize cursor-pointer mt-2 h-[30px] rounded-sm bg-white'>update</button>
            </div>
        </div>
    )
}

export default UserCard