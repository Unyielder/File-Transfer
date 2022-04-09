import { BASE_URL_FRONTEND } from './config/env.js';

export default function Navbar() {
    return (
        <div className="nav">
            <a href={`${BASE_URL_FRONTEND}/#/upload`}><h3 className="nav-title">File Transfer</h3></a>
        </div>
    )
}