import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from './components/UserProvider'; // UserProvider 사용하도록 수정
import reportWebVitals from './reportWebVitals';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider /> {/* App 대신 UserProvider로 감싸서 Context 사용 가능하도록 수정 */}
  </React.StrictMode>
);

reportWebVitals();