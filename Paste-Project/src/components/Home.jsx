import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToPaste, updateToPaste } from '../redux/pasteSlice';

const Home = () => {

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams('');

  const pasteId = searchParams.get('pasteId');

  const dispatch = useDispatch();
  const allPaste = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }

  }, [pasteId])

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId ||
        Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

    if (pasteId) {
      //update
      dispatch(updateToPaste(paste));
    } else {
      //create
      dispatch(addToPaste(paste));
    }

    //after creation or updation
    setTitle('');
    setValue('');
    setSearchParams('');

  }

  return (
    <div className='flex flex-col gap-5 pt-5'>
      <div className='flex flex-row gap-7 place-content-between'>
        <input
          className='p-1 rounded-2xl bg-black text-gray-400 w-[66%]'
          type='text'
          placeholder='enter title here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className='p-2 rounded-sm !bg-blue-500'>
          {
            pasteId ? 'Update My Paste' : "Create My Paste"
          }
        </button>
      </div>
      <div>
        <textarea
          className='w-[500px] p-2 rounded-2xl bg-black text-gray-400'
          value={value}
          placeholder='enter your content here'
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default Home
