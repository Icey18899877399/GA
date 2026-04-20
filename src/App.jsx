import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SpacePage from './pages/SpacePage.jsx'
import DeepseaPage from './pages/DeepseaPage.jsx'
import PolarPage from './pages/PolarPage.jsx'
import BioPage from './pages/BioPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/space" element={<SpacePage />} />
      <Route path="/deepsea" element={<DeepseaPage />} />
      <Route path="/polar" element={<PolarPage />} />
      <Route path="/bio" element={<BioPage />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
