import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../assets/components/header";
import { Input } from "../../assets/components/input";
import { db } from "../../services/firebase-connection";
import { 
  setDoc,
  doc,
  getDoc,
 } from "firebase/firestore";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa6";

export function Networks() {
  const [facebook, setFacebook] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");

  useEffect(() =>{
    function loadLinks(){
      const docRef = doc(db,"social", "link")
      getDoc(docRef)
      .then((snapshot) => {
        if(snapshot.data() !== undefined){
          setFacebook(snapshot.data()?.facebook)
          setWhatsapp(snapshot.data()?.whatsapp)
          setInstagram(snapshot.data()?.instagram)
        }
      })
    }
    loadLinks();
  },[])

  function handleRegister(e: FormEvent){
    e.preventDefault()
    setDoc(doc(db,"social","link"),{
      facebook: facebook,
      whatsapp: whatsapp,
      instagram: instagram,
    })
    .then(()=> {
      alert("Links salvos com sucesso")
    })
    .catch((error)=>{
      console.log("Erro ao salvar" + error)
    })
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2 mx-4">
      <Header />
      <h1 className="text-white text-2xl font-medium mb-4 pt-8">
        Minhas redes Sociais
      </h1>

      <form className="flex flex-col max-w-xl w-full gap-2" onSubmit={handleRegister}>
        <div className="flex gap-2 items-center"> 
          <FaFacebook color="white"/>
          <label className="font-extrabold bg-gradient-to-br from-blue-700 to-blue-400  bg-clip-text text-transparent">
            Link do Facebook
          </label>
        </div>
        <Input
          type="url"
          placeholder="Digite a url do Facebook..."
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
        <div className="flex gap-2 items-center"> 
          <FaWhatsapp color="white"/>
          <label className="font-extrabold bg-gradient-to-br from-zinc-50 to-blue-200  bg-clip-text text-transparent">
            Link do Whatsapp
          </label>
        </div>
        <Input
          type="url"
          placeholder="Digite a url do Whatsapp..."
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />
        <div className="flex gap-2 items-center"> 
          <FaInstagram color="white"/>
          <label className="font-extrabold bg-gradient-to-br from-pink-500 to-yellow-500  bg-clip-text text-transparent">
            Link do Instagram
          </label>
        </div>
        <Input
          type="url"
          placeholder="Digite a url do Instagram..."
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <button type="submit" className="text-white bg-blue-600 h-9 items-center rounded-md justify-center flex mb-7 font-bold mt-4">
          Salvar Links
        </button>
      </form>
    </div>
  );
}
