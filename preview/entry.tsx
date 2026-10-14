// Client-only entry used to build a static preview bundle (no Next.js runtime).
import { createRoot } from "react-dom/client";
import SmoothScroll from "@/components/SmoothScroll";
import Home from "@/app/page";

createRoot(document.getElementById("app")!).render(
  <SmoothScroll>
    <Home />
  </SmoothScroll>
);
