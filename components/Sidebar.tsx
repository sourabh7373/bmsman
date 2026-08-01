import Link from "next/link";

export default function Sidebar(){

return(

<div className="w-64 min-h-screen bg-white border-r p-6">


<h1 className="text-2xl font-bold mb-10">
BMSMan
</h1>


<ul className="space-y-3">


<Link href="/dashboard">
<li className="p-3 hover:bg-gray-100 rounded">
Dashboard
</li>
</Link>


<Link href="/organizations">

<li className="
p-3
hover:bg-orange-50
rounded
text-gray-700
">

Organizations

</li>

</Link>


<li className="p-3">
Jobs
</li>


<li className="p-3">
Quotes
</li>


</ul>


</div>

)

}