import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import StatsCard from "@/components/StatsCard";


export default function Dashboard(){


return(

<div className="flex bg-gray-100 min-h-screen">


<Sidebar />


<div className="flex-1">


<Topbar />



<div className="grid grid-cols-4 gap-5 p-6">


<StatsCard
title="Active Jobs"
value="308"
/>


<StatsCard
title="Manufacturing"
value="11"
/>


<StatsCard
title="Delivered"
value="26"
/>


<StatsCard
title="Overdue"
value="81"
/>



</div>



<div className="bg-white rounded-xl shadow m-6 p-6">


<h2 className="text-xl font-bold">
Recent Jobs
</h2>



<table className="w-full mt-5">


<thead>

<tr className="border-b">

<th className="text-left p-3">
Job
</th>

<th className="text-left p-3">
Client
</th>

<th className="text-left p-3">
Status
</th>


</tr>

</thead>


<tbody>


<tr className="border-b">

<td className="p-3">
JOB-1001
</td>


<td className="p-3">
ABC Company
</td>


<td className="p-3 text-green-600">
Delivered
</td>


</tr>



<tr>

<td className="p-3">
JOB-1002
</td>


<td className="p-3">
XYZ Ltd
</td>


<td className="p-3 text-orange-500">
Manufacturing
</td>


</tr>


</tbody>


</table>



</div>



</div>



</div>


)

}