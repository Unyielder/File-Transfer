import Dropzone from './Dropzone';
import Download from './Download';
import Link from './Link';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Welcome to FileDrive!</h1> 
          <Routes>
            {/* <Route path ="/" element={<App/>}/> */}
            <Route path="upload" element={<Dropzone/>}/>
            <Route path="upload/link/:id" element={<Link />}/>
            <Route path="download/:id" element={<Download />}/> 
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
