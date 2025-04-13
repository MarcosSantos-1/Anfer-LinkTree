import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

import { auth } from "../../services/firebase-connection";
import { signOut } from "firebase/auth";

export function Header() {
  async function handleLogout() {
    await signOut(auth);
  }
  return (
    <header className="w-full max-w-2xl mt-4 px-1 text-zinc-900 font-semibold">
      <nav className="bg-white h-12 flex items-center justify-between rounded-md px-3 py-1">
        <div className="flex gap-4">
          <Link
            to="/"
            className="hover:font-bold hover:text-purple-800 duration-100 transiti"
          >
            Home
          </Link>
          <Link
            to="/admin"
            className="hover:font-bold hover:text-purple-800 duration-100"
          >
            Links
          </Link>
          <Link
            to="/admin/social"
            className="hover:font-bold hover:text-purple-800 duration-100"
          >
            Redes Sociais
          </Link>
        </div>
        <button onClick={handleLogout}>
          <BiLogOut
            size={28}
            className="text-purple-600 hover:text-purple-700 duration-100"
          />
        </button>
      </nav>
    </header>
  );
}
