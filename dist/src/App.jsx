
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/space" element={<SpacePage />} />
      <Route path="/deepsea" element={<DeepseaPage />} />
      <Route path="/polar" element={<PolarPage />} />
      <Route path="/bio" element={<BioPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
