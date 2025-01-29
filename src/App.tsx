import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <main>
      <BrowserRouter>
        <Toaster />
        <div className='min-h-screen w-screen flex items-center justify-center'>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </main>
  )
}
export default App
