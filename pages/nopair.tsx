import Router from 'next/router'
import React from 'react'

type Props = {}

function Nopair({}: Props) {
  return (
    <div className='flex flex-col justify-center items-center mt-20 '>
        <h1 className='text-5xl xs:text-8xl font-semibold text-red-500'>404</h1>
        <h1 className='text-xl xs:text-3xl font-semibold text-red-500 mb-10'>Pair Not Found</h1>
        <h1 className='text-xl xs:text-3xl font-semibold text-red-500 mb-10'>The pair you're looking for doesn't exist </h1>
        <div className='flex flex-row space-x-10'>
            <button 
             onClick={() => {
              Router.push(
                '/'
              )
            }}
            className='Buttonpurple '>
                Back to homepage
            </button>
            <button 
            onClick={() => {
              Router.push(
                '/createpair'
              )
            }}
            className='Buttonpurple '>
                CreatePair
            </button>
        </div>
    </div>
  )
}

export default Nopair