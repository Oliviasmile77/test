import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SymbolDetailPage } from './pages/SymbolDetailPage'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <h1>HUB Symbol Detail</h1>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/symbol/:ticker/*" element={<SymbolDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
