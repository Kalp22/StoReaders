import Navbar from "@/components/navbar/navbar";

export default function AboutLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
