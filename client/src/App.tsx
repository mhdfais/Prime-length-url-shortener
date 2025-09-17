import { Toaster } from "react-hot-toast";
import Shortener from "./components/Shortener";

function App() {
  return (
    <> 
    <Toaster position="top-right" />
     <div className="px-5 py-10 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-center text-4xl font-bold text-gray-800">
        Prime Length URL Shortener
      </h1>
      <Shortener />
    </div>
    </>
  );
}

export default App;
