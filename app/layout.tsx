import "./globals.css";
import { Open_Sans } from "next/font/google";
import Navbar from "./shared/Navbar";
const open_sans = Open_Sans({
  subsets: ["latin"],
});
export const metadata = {
  title: "Blog.AI",
  description: "Blog app built with Next.js using AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={open_sans.className} lang="en">
      <body className="max-w-[1300px] mx-auto">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
