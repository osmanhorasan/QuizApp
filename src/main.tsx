import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QuizProvider } from "./providers/QuizProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { styleReset } from "react95";

// pick a theme of your choice
import original from "react95/dist/themes/original";
// original Windows95 font (optionally)
import { TimerProvider } from "./providers/TimerProvider.tsx";
import { QuizAnswersProvider } from "./providers/QuizAnswersProvider.tsx";

const GlobalStyles = createGlobalStyle`
  ${styleReset}
`;
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <GlobalStyles />
    <ThemeProvider theme={original}>
      <QuizProvider>
        <TimerProvider>
          <QuizAnswersProvider>
            <App />
          </QuizAnswersProvider>
        </TimerProvider>
      </QuizProvider>
    </ThemeProvider>
  </BrowserRouter>
);
