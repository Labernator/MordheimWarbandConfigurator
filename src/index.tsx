import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { AddWarriorPage } from "./pages/AddWarrior";
import { LandingPage } from "./pages/LandingPage";
import { MaintainWarriorPage } from "./pages/MaintainWarrior";
import { PdfPage } from "./pages/PdfPage";
import { WarbandOverviewPage } from "./pages/WarbandOverview";
import { store } from "./redux/store";
import {Auth0ProviderWithHistory} from "./utilities/AuthProvider";
import { LoginPage } from "./pages/LoginPage";
import { MaintaintWarriorEquipmentPage } from "./pages/MaintainWarriorEquipment";
import { MaintainWarriorHeadPage } from "./pages/MaintainWarriorHead";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const App = () =>

  <HashRouter basename={`/${process.env.PUBLIC_URL}`}>
    <Auth0ProviderWithHistory>
      <div className="main-content">
        <div className='container'>
          <Routes>
            <Route path="/overview" Component={WarbandOverviewPage} />
            <Route path="/" Component={LoginPage} />
            <Route path="/start" Component={LandingPage} />
            <Route path="/add-warrior" Component={AddWarriorPage} />
            <Route path="/warrior-equipment" Component={MaintaintWarriorEquipmentPage} />
            <Route path="/maintain-warrior" Component={MaintainWarriorPage} />
            <Route path="/warrior-main" Component={MaintainWarriorHeadPage} />
            <Route path="/print-pdf" Component={PdfPage} />
          </Routes>
        </div>
      </div>
    </Auth0ProviderWithHistory>
  </HashRouter>;


root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
