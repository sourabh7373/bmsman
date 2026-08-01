"use client";


import {useEffect,useState} from "react";
import {api} from "@/lib/api";
import {useParams} from "next/navigation";


export default function OrganizationDetails(){


const params=useParams();

const [org,setOrg]=useState<any>();



useEffect(()=>{


api.get(`/organizations/${params.id}`)
.then(res=>setOrg(res.data));


},[]);



if(!org)
return <div className="p-6">
Loading...
</div>



return(

<div className="p-6">


<h1 className="text-2xl font-bold mb-5">
Organization Details
</h1>



<div className="bg-white shadow rounded-xl p-6">


<p>
<b>Name:</b> {org.name}
</p>


<p>
<b>Email:</b> {org.email}
</p>


<p>
<b>ID:</b> {org.id}
</p>


</div>



</div>

)

}