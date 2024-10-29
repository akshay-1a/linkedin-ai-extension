import React from 'react'
import Icon from '~/assets/Icon.svg';

export default function AiIcon({ onClick }: { onClick: () => void }) {
  return (
      <button
          className="w-[25px] h-[25px] p-[2px] m-1 rounded-full bg-white select-none"
          onClick={onClick}>
          <img src={Icon} alt="ai icon" className='w-5 h-5 m-auto' />
      </button>
  )
}
