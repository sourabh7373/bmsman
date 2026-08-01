"use client";

import { useRouter } from "next/navigation";

export default function Topbar(){

const router = useRouter();


const logout = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");

  router.push("/login");

};


return(

<div className="
h-16
bg-white
border-b
border-gray-200
flex
items-center
justify-between
px-6
">


<input

className="
w-96
bg-gray-50
border
border-gray-200
rounded-lg
px-4
py-2
text-sm
outline-none
"

placeholder="Search jobs..."

 />



<div className="
flex
items-center
gap-4
">


<div className="
w-10
h-10
rounded-full
bg-orange-100
text-orange-600
flex
items-center
justify-center
font-bold
">

SA

</div>



<div>

<p className="font-medium text-gray-800">
Super Admin
</p>

<p className="text-xs text-gray-500">
Administrator
</p>

</div>



<button

onClick={logout}

className="
bg-red-500
hover:bg-red-600
text-white
px-4
py-2
rounded-lg
text-sm
"

>

Logout

</button>



</div>


</div>

)

}