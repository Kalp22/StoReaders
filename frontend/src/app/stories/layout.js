import Navbar from "@/components/navbar/navbar";

export default function StoryPageLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
