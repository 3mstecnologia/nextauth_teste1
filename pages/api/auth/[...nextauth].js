import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import axios from 'axios'

export default NextAuth({
  
  
  callbacks: {
    jwt: ({ token, user }) => {
      if (user){
        token = user
      }
    return token
    },
    session: ({ session, token }) => {
      if (token){
        session = token
      }
      return session
    },
  },
  
  secret: process.env.NEXT_PUBLIC_SECRET,
  jwt: {
    secret: process.env.NEXT_PUBLIC_SECRET,
    encryption: true
  },





  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Ra e Senha',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        ra: { label: "ra", type: "text", placeholder: "ra" },
        senha: {  label: "Senha", type: "password" }
      },
      async authorize(credentials, req) {
   
        const res = await axios.post('http://172.16.248.106:4448/validaLogin', {
          
            user: {
              raVar: credentials.ra,
              senhaVar: credentials.senha
            }
        });
          
        const user = await res.data
  
        // If no error and we have user data, return it
        if (user) {
          return user
        }else{
          console.log("erro")
        // Return null if user data could not be retrieved
        return null
        }
      }
    })
  ],

  
});
