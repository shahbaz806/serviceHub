import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageShell({ children }) {
  return (
    <div className="flex min-h-screen w-full min-w-0 max-w-full flex-col bg-offwhite">
      <Navbar />
      <div className="min-w-0 w-full max-w-full flex-1">{children}</div>
      <Footer />
    </div>
  );
}
