"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";


export default function CreateOrganization() {

  const router = useRouter();

  const [form,setForm] = useState({

    companyName:"",
    companyCode:"",
    address:"",
    city:"",
    country:"",
    postalCode:"",
    phone:"",
    mobileNumber:"",
    email:"",
    gstNo:"",
    adminUsername:"",
    adminPassword:"",
    adminEmail:"",
    adminDisplayName:"",
    adminMobileNumber:""

  });


  const [loading,setLoading] = useState(false);



  const handleChange=(e:any)=>{

    setForm({

      ...form,

      [e.target.name]:e.target.value

    });

  };



  const createOrganization=async()=>{


    try{

      setLoading(true);


      const response = await api.post(
        "/organizations",
        form
      );


      console.log(response.data);


      alert("Organization Created Successfully");


      router.push("/organizations");


    }
    catch(error:any){

      console.log(
        error.response?.data
      );


      alert(
        JSON.stringify(error.response?.data)
      );

    }
    finally{

      setLoading(false);

    }

  };



  const fields=[

    "companyName",
    "companyCode",
    "address",
    "city",
    "country",
    "postalCode",
    "phone",
    "mobileNumber",
    "email",
    "gstNo",
    "adminUsername",
    "adminPassword",
    "adminEmail",
    "adminDisplayName",
    "adminMobileNumber"

  ];



return(

<div className="p-6">


<h1 className="text-2xl font-bold mb-6">
Create Organization
</h1>



<div className="
bg-white
rounded-xl
shadow
p-6
max-w-xl
grid
gap-4
">


{
fields.map((field)=>(


<input

key={field}

name={field}

value={(form as any)[field]}

onChange={handleChange}

placeholder={field}

type={
field==="adminPassword"
?
"password"
:
"text"
}

className="
border
rounded-lg
p-3
w-full
"

/>


))
}



<button

onClick={createOrganization}

disabled={loading}

className="
bg-orange-500
hover:bg-orange-600
text-white
rounded-lg
p-3
"

>

{
loading
?
"Creating..."
:
"Create Organization"
}


</button>



</div>


</div>

)


}