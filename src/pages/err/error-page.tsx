import { HomeIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center flex flex-col items-center justify-center">
        <div className="mb-8">
          <img
            src="/images/404-ilustration.png" 
            alt="Error Illustration"
            className="w-72 h-72 mx-auto" 
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-50 mb-4">404</h1>
        <p className="text-gray-100 mb-6 font-medium">
          Oops! A página solicitada não existe!
        </p>
      
      <Link to="/">
        <button className="px-2 py-2 gap-1 text-white font-bold bg-cyan-500 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:cyan-blue-400 flex items-center justify-center">
          <HomeIcon color="white" className="w-6" />
          Voltar para Home
        </button>
      </Link>
      </div>
    </div>
  );
}
