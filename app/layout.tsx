import "./globals.css";


export const metadata = {

title:"BMSMan",

description:"Dashboard"

};



export default function RootLayout({

children,

}:Readonly<{

children:React.ReactNode

}>) {


return (

<html lang="en">

<body>

{children}

</body>

</html>

)

}