import Mobile from "./components/Mobile/Mobile";
import Desktop from "./components/Desktop/Desktop";
import { useMediaQuery } from "@react-hook/media-query";

function App() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <div>{isMobile ? <Mobile /> : <Desktop />}</div>
    </>
  );
}

export default App;