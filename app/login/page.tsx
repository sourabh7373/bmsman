"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function LoginPage() {

  const router = useRouter();

  const [username,setUsername] = useState("superadmin");
  const [password,setPassword] = useState("superadmin123");
  const [loading,setLoading] = useState(false);


  const login = async()=>{

    try{

      setLoading(true);

      const response = await api.post(
        "/auth/authenticate",
        {
          username,
          password
        }
      );


      localStorage.setItem(
        "token",
        response.data.token
      );


      localStorage.setItem(
        "refreshToken",
        response.data.refreshToken
      );


      router.push("/dashboard");


    }catch(error){

      alert("Invalid Username or Password");

    }
    finally{
      setLoading(false);
    }

  }


  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">


      <div className="bg-white shadow-xl rounded-xl p-8 w-[380px]">


        <h1 className="text-3xl font-bold text-center mb-2">
          BMSMan
        </h1>


        <p className="text-gray-500 text-center mb-6">
          Login to Dashboard
        </p>



        <input

          className="border p-3 w-full rounded mb-4"

          value={username}

          onChange={
            e=>setUsername(e.target.value)
          }

          placeholder="Username"

        />



        <input

          className="border p-3 w-full rounded mb-5"

          type="password"

          value={password}

          onChange={
            e=>setPassword(e.target.value)
          }

          placeholder="Password"

        />



        <button

          onClick={login}

          className="bg-orange-500 hover:bg-orange-600 text-white w-full p-3 rounded"

        >

          {
            loading 
            ? "Logging..."
            : "Login"
          }

        </button>


      </div>


    </div>

  )
}