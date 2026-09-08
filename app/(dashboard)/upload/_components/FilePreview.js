import { X } from 'lucide-react'
import Image from 'next/image'


import React from 'react'

function FilePreview({file,removeFile}) {
  return (
    <div className='flex items-center gap-2 justify-between mt-5 border rounded-md p-2 border-blue-400'>
                          <div className='flex items-center p-2'>
                          <Image src='/files.png' width={50} height={50} alt='file' />
                          <div className='text-left'>
                                      <h2 >{file.name}</h2>
                                      
                                      <h2 className='text-[15px] text-red-800 bg-blue-300'>{file?.type}/{ (file.size/1024/1024).toFixed(2)}MB</h2>
                          </div>
                         
              </div>
                          <X className='text-red-500 cursor-pointer' onClick={() => removeFile()} />
              </div>
  )
}

export default FilePreview
