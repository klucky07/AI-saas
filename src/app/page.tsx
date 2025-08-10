"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { use, useState } from "react";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
export default function Home() {
  const [email,setEmail]=useState("");
  const [name,setName]=useState("");
  const [password,setPassword]=useState("")
  const onSubmit=()=>{
    authClient.signUp.email({
email,name,password
    },
  {
    onError:()=>{
      window:alert("something wtong")
    },
     onSuccess:()=>{
    window:alert("success")
  }
  },
 
  
  );
  }
  return (
    <div className="">
     <Input placeholder="name" value={name} onChange={(e) => setName(
      e.target.value
  )}/>
      <Input placeholder="email" value={email} onChange={(e) => setEmail(
      e.target.value
  )}/>
       <Input placeholder="password" value={password} onChange={(e) => setPassword(
      e.target.value
  )}/>
  <Button onClick={onSubmit}>create user</Button>
    </div>
    
  );
}
