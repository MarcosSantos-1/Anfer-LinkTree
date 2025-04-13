import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{} //-> passar todos os atributos de HTML para o input

export function Input(props: InputProps) {
  return (
      <input placeholder='text-input' 
        type="text"
        className='border-0 outline-none rounded-md h-9 px-2 mb-3 text-zinc-800 font-semibold' 
        {...props} //-> truque para que todos os atributos do Input sejam childreens e possa passar quantos quiseres
      />
  )
}

