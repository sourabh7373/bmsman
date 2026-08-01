"use client";

import {useEffect,useState} from "react";
import {api} from "@/lib/api";
import Link from "next/link";


export default function Organizations(){

const [organizations,setOrganizations]=useState<any[]>([]);


useEffect(()=>{

loadOrganizations();

},[]);



const loadOrganizations=async()=>{

try{

const res = await api.get("/organizations");

console.log("Organizations Response:", res.data);


// Handle different API response formats

if(Array.isArray(res.data)){

setOrganizations(res.data);

}
else if(Array.isArray(res.data.content)){

setOrganizations(res.data.content);

}
else if(Array.isArray(res.data.data)){

setOrganizations(res.data.data);

}
else{

setOrganizations([]);

}


}
catch(error:any){

console.log(
"Organization Error:",
error.response?.data || error
);

}

};



return(

<div className="p-6">


<div className="flex justify-between mb-6">


<h1 className="text-2xl font-bold">
Organizations
</h1>



<Link href="/organizations/create">

<button className="
bg-orange-500
text-white
px-4
py-2
rounded-lg
">

+ Create Organization

</button>

</Link>


</div>




<div className="bg-white rounded-xl shadow">


<table className="w-full">


<thead>

<tr className="border-b">


<th className="p-4 text-left">
Company Name
</th>


<th className="p-4 text-left">
Email
</th>


<th className="p-4">
Action
</th>


</tr>

</thead>




<tbody>


{
organizations?.map((org)=>(


<tr
key={org.id}
className="border-b"
>


<td className="p-4">
{org.companyName}
</td>



<td className="p-4">
{org.email}
</td>




<td className="p-4">


<Link href={`/organizations/${org.id}`}>

<button className="
bg-blue-500
text-white
px-3
py-1
rounded
">

View

</button>

</Link>


</td>



</tr>


))

}



{
organizations.length === 0 && (

<tr>

<td
colSpan={3}
className="p-5 text-center text-gray-500"
>

No Organizations Found

</td>

</tr>

)

}



</tbody>


</table>


</div>


</div>

)

}