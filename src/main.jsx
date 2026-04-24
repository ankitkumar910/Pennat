import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./input.css";
import Tiptap from "./components/Tiptap.jsx";
import Email from "./components/Email.jsx";
import { TooltipProvider } from "@/components/ui/tooltip";
import TopProgressBar from "./components/TopProgressBar.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		
		<TooltipProvider>
			
			
			<App />
		</TooltipProvider>
	</StrictMode>
);
