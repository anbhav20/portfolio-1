import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Load AOS library
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

createRoot(document.getElementById("root")!).render(<App />);
