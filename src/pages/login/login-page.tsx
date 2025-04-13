import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Input } from '../../assets/components/input'
import {  auth } from "../../services/firebase-connection"
import { signInWithEmailAndPassword } from "firebase/auth"

export function LoginPage() {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const navigate = useNavigate()

 function handleSubmit(e: FormEvent){
  e.preventDefault()
  if(email === "" || password === ""){
    alert("Preencha todos os campos!")
    return
  }
  signInWithEmailAndPassword(auth, email, password)
  .then(()=> {
    console.log("Logado com sucesso") 
    navigate(`/admin`, {replace: true})
  })  
  .catch((error)=>{
    alert("Erro ao fazer o Login:")
    console.log(error)
  })

  setEmail("")
  setPassword("")
}
  return (
      <div className='w-full h-screen flex flex-col py-4 items-center justify-center space-y-4'>
        <Link to="/">
          <h1 className='font-bold text-5xl text-white mt-11 mb-7'>Dev
          <span className='bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent '>Link</span></h1>
        </Link>
        <form onSubmit={handleSubmit} className='w-full max-w-xl flex flex-col px-2 gap-1 '>
          <Input
            placeholder='Digite o e-mail' 
            type='email'
            value={email} 
            onChange={(e)=> setEmail(e.target.value)}/>
          <Input 
            placeholder='Digite a senha'
            type='password'
            value={password} 
            onChange={(e)=> setPassword(e.target.value)}/>
            
          <button className='bg-blue-600 h-9 rounded border-0 text-lg font-medium ' type='submit'>
            Acessar
          </button>
        </form>
      </div>
  )
}

