import Navbar from './Navbar';
import Dropzone from './Dropzone';
import Download from './Download';
import Link from './Link';
import Expired from './Expired';
import Error from './Error';
import './App.css';
import {HashRouter, Routes, Route} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <HashRouter>
      <div>
        <Navbar />
          <Routes>
            <Route path="upload" element={<Dropzone/>}/>
            <Route path="upload/link/:id" element={<Link />}/>
            <Route path="upload/error" element={<Error />}/>
            <Route path="download/:id" element={<Download />}/> 
            <Route path="expired" element={<Expired />}/>
            
          </Routes>
      
      </div>
    </HashRouter>
    
  );
}

export default App;
