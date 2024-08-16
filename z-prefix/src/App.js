import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './Login'
import { Homepage } from './Homepage'
import { ItemDetails } from './ItemDetails'
function App() {

  return (
    <div>
     <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/homepage' element={<Homepage />}/>
        <Route path='/itemdetails' element={<ItemDetails />}/>
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
