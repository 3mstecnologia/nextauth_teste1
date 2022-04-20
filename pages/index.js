import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { signIn, signOut, useSession, getSession } from "next-auth/react";

export const getServerSideProps = async ({ req }) => {
  //console.log(req)
  const  session  = await getSession({ req });
  console.log(session)
  if (session) {
    return {
      props: {
        session,
      },
    };
  }else{
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
}





export default function Home({props}) {
      console.log(props)
      return(
      <div>
        ola 
        <button onClick={() => signOut()}>Sign out</button>
      </div>
      )
  }

