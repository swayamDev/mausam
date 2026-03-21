import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "./components/layout/Header";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
    </ThemeProvider>
  );
}

export default App;
