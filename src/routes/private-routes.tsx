import { ReactNode, useState, useEffect } from "react";
import { auth } from "../services/firebase-connection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode;
}
export function PrivateRoute({ children }: PrivateProps): any {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user?.uid,
          email: user?.email,
        };
        localStorage.setItem("@reactLinks", JSON.stringify(userData));
        setLoading(false);
        setSigned(true);
      } else {
        setLoading(false);
        setSigned(false);
      }
    });
    return(()=>{
      unsub()
    })
  }, []);


  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-900">
        <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if(!signed){
    return <Navigate to="/login"/>
  }
  return children;
}
