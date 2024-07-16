import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WarbandOverviewPage } from './pages/WarbandOverview';
import { LandingPage } from './pages/LandingPage';
import { Provider } from 'react-redux';
import { store } from "./redux/store";
import { AddWarriorPage } from './pages/AddWarrior';
import { MaintainWarriorPage } from './pages/MaintainWarrior';
import { PdfPage } from './pages/PdfPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App = () =>
  <BrowserRouter basename={`/${process.env.PUBLIC_URL}`}>
    <div className="app-body main-content main-wrapper mainWrapper_z2l0 docMainContainer_TBSr">
      <div className='container padding-top--md padding-bottom--lg'>
      <Routes>
      <Route path="/warband-overview" Component={WarbandOverviewPage} />
        <Route path="/" Component={LandingPage} />
        <Route path="/add-warrior" Component={AddWarriorPage} />
        <Route path="/maintain-warrior" Component={MaintainWarriorPage} />
        <Route path="/print-pdf" Component={PdfPage} />
      </Routes>
      </div>
    </div>
  </BrowserRouter>;

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);
