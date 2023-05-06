import NpmSearch from "./NpmPackage/NpmPackage";
import { Routes, Route } from "react-router-dom";
import Favourites from "./NpmPackage/favList";
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<NpmSearch/>} />
      <Route path='/fav' element={<Favourites/>} />
    </Routes>
     
    </>
  );
}

export default App;
