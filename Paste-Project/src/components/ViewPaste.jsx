import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from "react-hot-toast";

const ViewPaste = () => {
  const { id } = useParams();

  const allPaste = useSelector((state) => state.paste.pastes);

  const paste = allPaste.find((p) => p._id === id);

  console.log("final paste:", paste);
  return (
    <div>
      <div className='flex flex-col gap-5 pt-5'>
        <div className='flex flex-row gap-7 place-content-between'>
          <input
            className='p-1 rounded-2xl bg-black text-gray-400 w-[66%]'
            type='text'
            placeholder='enter title here'
            value={paste.title}
            disabled
          />
          <button
            className='bg-gray-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 active:scale-95 transition'
            onClick={() => {
              navigator.clipboard.writeText(paste?.content)
              toast.success("Copied to clipboard");}}
              > Copy
              </button>
      </div>
      <div>
        <textarea
          className='w-[500px] p-2 rounded-2xl bg-black text-gray-400'
          value={paste.content}
          placeholder='enter your content here'
          disabled
          rows={20}
        />
      </div>
    </div>
    </div >
  )
}

export default ViewPaste
