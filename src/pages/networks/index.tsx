import { Header } from "../../components/header";
import { Input } from "../../components/Input";

import { FormEvent, useEffect, useState } from "react";
import { db } from "../../services/firebaseConection";
import { setDoc, doc, getDoc } from "firebase/firestore";

export function Networks() {

    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [youtube, setYoutube] = useState("");

    useEffect(() => {
        
        function loadingLinks(){
            const docRef = doc(db, "social", "links");
            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data !== undefined){
                    setFacebook(snapshot.data()?.facebook);
                    setInstagram(snapshot.data()?.instagram);
                    setYoutube(snapshot.data()?.youtube);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            

        }

        loadingLinks();

    },[])

    function handleRegister(e: FormEvent) {
        e.preventDefault();

        setDoc(doc(db, "social", "links"), { 
            facebook: facebook,
            instagram: instagram,
            youtube: youtube,
        })
        .then(() => {
            console.log("Cadastrado com sucesso!!");
        })
        .catch((err) => {
            console.log("Erro ao salvar...");
            console.log(err);
        })


    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />
            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais</h1>

            <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2">Link do facebook</label>
                <Input
                    placeholder="Digite a url do seu facebook"
                    type="url"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link do instagram</label>
                <Input
                    placeholder="Digite a url do instagram"
                    type="url"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link do youtube</label>
                <Input
                    placeholder="Digite a url do youtube"
                    type="url"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                />

    <button type="submit" className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 mt-3 font-medium">
        Salvar links
    </button>

            </form>


        </div>
    )
}