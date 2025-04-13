import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../assets/components/header";
import { Input } from "../../assets/components/input";
import { FiTrash } from "react-icons/fi";

import { db } from "../../services/firebase-connection.ts";
import {
  addDoc,
  collection,
  query,
  doc,
  deleteDoc,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

interface LinksProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  textColor: string;
}

export function AdminPage() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [textColorInput, setTextColorInput] = useState("#fafafa");
  const [bgColorInput, setBgColorInput] = useState("#09090b");

  const [links, setLinks] = useState<LinksProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [] as LinksProps[];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          textColor: doc.data().textColor,
        });
      });
      setLinks(lista);
    });

    return () => {
      unsub();
    };
  }, []);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (nameInput == "" || urlInput === "") {
      alert("Preencha os campos vazios!");
      return;
    }
    //CREATE --
    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: bgColorInput,
      textColor: textColorInput,
      created: new Date(),
    })
      .then(() => {
        setNameInput("");
        setUrlInput("");
        console.log("Cadastrado com sucesso!");
      })
      .catch((error) => {
        console.log("Erro ao cadastrar no banco " + error);
      });
  }

  async function handleDeleteLink(id: string) {
    const docRef = doc(db, "links", id);
    try {
      if (window.confirm("Você realmente quer excluir o link?")) {
        await deleteDoc(docRef);
      }
    } catch (error) {
      console.error("Erro ao deletar", error);
    }
  }


  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2 text-z">
      <Header />

      <form
        className="flex flex-col mt-8 mb-3 w-full max-w-xl"
        onSubmit={handleRegister}
      >
        <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
        <Input
          placeholder="Digite o nome do link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">URL do link</label>
        <Input
          placeholder="Digite a url..."
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        <section className="flex my-4 gap-5">
          <div className="flex gap-2 items-center">
            <label className="text-white font-medium mt-2 mb-2">
              Cor do link
            </label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <label className="text-white font-medium mt-2 mb-2">
              Cor de fundo do link
            </label>
            <input
              type="color"
              value={bgColorInput}
              onChange={(e) => setBgColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput !== "" && (
          <div className="flex items-center justify-start flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-2">
              Veja como está ficando:
            </label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3 "
              style={{ marginBottom: 8, backgroundColor: bgColorInput }}
            >
              <p className="font-medium" style={{ color: textColorInput }}>
                {nameInput}
              </p>
            </article>
          </div>
        )}
        <button
          type="submit"
          className="mb-7 bg-blue-600 h-9 rounded-md font-medium gap-4 flex justify-center items-center"
        >
          Cadastrar
        </button>
      </form>

      <h2 className="font-bold text-white mb-4 text-2xl">Meus links</h2>

      {links.map( (link ) => (
        <article
          key={link.id}
          className="flex justify-between gap-2 rounded-md h-12 w-11/12 max-w-xl items-center px-2 font-semibold select-none"
          style={{ backgroundColor: link.bg, color: link.textColor }}
        >
          <p>{link.name}</p>
          <div>
            <button 
            className=" border border-dashed p-1 rounded-lg bg-white hover:bg-zinc-400 duration-200" 
            onClick={ () => handleDeleteLink( link.id )}>
              <FiTrash size={20} color="black" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
