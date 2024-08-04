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
    <div className="main-content">
      <div className='container'>
      <Routes>
      <Route path="/overview" Component={WarbandOverviewPage} />
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
