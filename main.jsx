import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx"; // დარწმუნდით, რომ App.jsx ამავე საქაღალდეშია

const root = createRoot(document.getElementById("root"));
root.render(<App />);
