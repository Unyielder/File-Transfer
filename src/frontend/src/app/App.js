import Navbar from '../navbar/Navbar';
import Dropzone from '../dropzone/Dropzone';
import Download from '../download/Download';
import Link from '../link/Link';
import Expired from '../expired/Expired';
import Error from '../error/Error';
import './App.css';
import {HashRouter, Routes, Route, Navigate} from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import { useGlobalState } from '../form/Form';


function App() {
  return (
    <div>
      <LoadingOverlay
                active={ useGlobalState('isLoading')[0] }
                spinner
                text='Uploading please wait...'
              >
      <HashRouter>

          <Navbar />

          <Routes>
            <Route path="/" element={<Navigate to="/upload" />}/>
            <Route path="upload" element={<Dropzone/>}/>
            <Route path="upload/link/:id" element={<Link />}/>
            <Route path="upload/error" element={<Error />}/>
            <Route path="download/:id" element={<Download />}/> 
            <Route path="expired" element={<Expired />}/>
          </Routes>
          
      </HashRouter>
      </LoadingOverlay>
    </div>
  );
}

export default App;
