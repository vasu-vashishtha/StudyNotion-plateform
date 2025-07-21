import React from 'react'

const HighlightText = ({text}) => {
  return (
      <span className='font-bold bg-gradient-to-br from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-4xl text-transparent lg:w-[70%] '>
        {" "}
        {text}
      </span>
  )
}

export default HighlightText;