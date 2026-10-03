import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageShell({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-offwhite">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
