import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RosterPage } from './pages/warbands/roster';
import { CreatorPage } from './pages/warbands/creator';
import { LandingPage } from './pages/LandingPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App = () =>
  <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}>
    <div className="app-body main-wrapper mainWrapper_z2l0 docMainContainer_TBSr">
      <div className='container padding-top--md padding-bottom--lg'>
      <Routes>
      <Route path="/creator" Component={CreatorPage} />
        <Route path="/" Component={LandingPage} />
      </Routes>
      </div>
    </div>
  </BrowserRouter>;

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
