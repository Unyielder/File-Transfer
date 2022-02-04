import Navbar from './Navbar';
import Dropzone from './Dropzone';
import Download from './Download';
import Link from './Link';
import Expired from './Expired';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <BrowserRouter>
      <div>
      <Navbar />
        
          <Routes>
            {/* <Route path ="/" element={<App/>}/> */}
            <Route path="upload" element={<Dropzone/>}/>
            <Route path="upload/link/:id" element={<Link />}/>
            <Route path="download/:id" element={<Download />}/> 
            <Route path="expired" element={<Expired />}/>
          </Routes>
      
      </div>
    </BrowserRouter>
    
  );
}

export default App;
