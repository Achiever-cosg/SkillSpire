import React from 'react';
import { TbFaceIdError } from "react-icons/tb";

const Error = () => {
  return (
    <div className='flex justify-center items-center text-3xl text-richblack-800 bg-richblack-5  w-full min-h-screen gap-5'>
    <TbFaceIdError />
      <h1>Error - 404</h1>
    </div>
  )
}

export default Error
