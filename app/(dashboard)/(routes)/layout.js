import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import TopHeader from './_section/TopHeader'
import SideNav from "./_section/SideNav";
export const metadata = {
  title: "Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">

        <body>
          <TopHeader />
          <SideNav/>
          {children}</body>
      </html>
    </ClerkProvider>
    
  );
}


