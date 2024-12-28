import { useState, useEffect } from "react";
import { Social } from "../../components/Social";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

import { db } from "../../services/firebaseConection";
import { getDocs, collection, orderBy, getDoc, query, doc } from "firebase/firestore";

interface LinksProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

interface SocialLinksProps {
    facebook: string;
    instagram: string;
    youtube: string;
}

export function Home() {

    const [links, setLinks] = useState<LinksProps[]>([]);
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();

    useEffect(() => {

        function loadLinks() {
            const linksRef = collection(db, "links");
            const queriyRef = query(linksRef, orderBy("created", "asc"));

            getDocs(queriyRef)
                .then((snapshot) => {
                    let lista = [] as LinksProps[];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            name: doc.data().name,
                            url: doc.data().url,
                            bg: doc.data().bg,
                            color: doc.data().color,
                        })
                    })

                    setLinks(lista);

                })
        }

        loadLinks();

    }, [])

    useEffect(() => {
        function loadSocialLinks() {
            const docRef = doc(db, "social", "links");
            getDoc(docRef)
                .then((snapshot) => {
                    if (snapshot.data() !== undefined) {
                        setSocialLinks({
                            facebook: snapshot.data()?.facebook,
                            instagram: snapshot.data()?.instagram,
                            youtube: snapshot.data()?.youtube
                        });
                    }
                })
        }
        loadSocialLinks();
    }, [])

    return (
        <div className="flex flex-col w-full py-4 justify-center items-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">Eduardo Errera</h1>
            <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">
                {links.map((link) => (
                    <section
                        key={link.id}
                        className="mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
                        style={{ backgroundColor: link.bg, color: link.color }}>
                        <a href={link.url} target="_blank">
                            <p className="text-base md:text-lg">
                                {link.name}
                            </p>
                        </a>
                    </section>
                ))}

                {socialLinks && Object.keys(socialLinks).length > 0 && (
                    <footer className="flex justify-center gap-3 my-4 items-center">
                        <Social url={socialLinks?.facebook}>
                            <FaFacebook size={35} color="#fff" />
                        </Social>
                        <Social url={socialLinks?.instagram}>
                            <FaInstagram size={35} color="#fff" />
                        </Social>
                        <Social url={socialLinks?.youtube}>
                            <FaYoutube size={40} color="#fff" />
                        </Social>
                    </footer>
                )}

            </main>



        </div>
    )
}