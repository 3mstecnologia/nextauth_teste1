import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    var usuario = {
      sessao: session.user,
      ra: "123456",
    };
    return (
      <div>
        ola
        {console.log(usuario)}
      </div>
    );
  } else {
    return <div>Nao esta logado</div>;
  }
}
