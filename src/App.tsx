
import { Route, Routes } from 'react-router-dom';
import QuickCampaign from './pages/QuickCampaign';
import CampaignPreview from './pages/CampaignPreview';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/quick-campaign" element={<QuickCampaign />} />
        <Route path="/preview" element={<CampaignPreview />} />
      </Routes>
    </div>
  );
}

export default App;
