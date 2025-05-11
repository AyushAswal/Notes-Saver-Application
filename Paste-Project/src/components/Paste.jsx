import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPaste } from '../redux/pasteSlice'
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';


const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  console.log(pastes);

  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()));

  function handleDelete(pasteId) {
    console.log("Trying to delete paste with id:", pasteId);
    dispatch(removeFromPaste(pasteId));
  }
  return (
    <div>
      <input
        className='p-1 rounded-2xl bg-black text-gray-400 w-[500px]'
        type='search'
        value={searchTerm}
        placeholder='search items ...'
        onChange={e => setSearchTerm(e.target.value)}
      />

      <div className='flex flex-col gap-5 mt-2'>
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) => {

              return (
                <div key={paste._id} className='border flex flex-col items-center gap-3'>
                  <div>
                    {paste.title}
                  </div>
                  <div>
                    {paste.content}
                  </div>
                  <div className='w-full flex justify-between'>
                    <button className='bg-gray-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 active:scale-95 transition'>
                    <Link to={`/?pasteId=${paste?._id}`}>
                        Edit
                      </Link>
                    </button>
                    <button className='bg-gray-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 active:scale-95 transition'>
                      <Link to={`/pastes/${paste?._id}`}>
                        View
                      </Link>
                    </button>
                    <button
                      className='bg-gray-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 active:scale-95 transition'
                      onClick={() => handleDelete(paste?._id)}>
                      Delete
                    </button>
                    <button
                      className='bg-gray-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 active:scale-95 transition'
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content)
                        toast.success("Copied to clipboard");
                      }
                      }>
                      Copy
                    </button>
                    <button className='bg-gray-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 active:scale-95 transition'>
                      Share
                    </button>
                  </div>
                  <div>
                    {paste.createdAt}
                  </div>
                </div>
              )
            }
          )
        }
      </div>
    </div >
  )
}

export default Paste
