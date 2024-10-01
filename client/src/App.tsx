import { Route, Routes } from 'react-router-dom';

import { Events } from './components/Events/Events';
import { Register } from './components/Register/Register';
import { View } from './components/View/View';

import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/register/:id" element={<Register />} />
        <Route path="/view/:id" element={<View />} />
      </Routes>
    </div>
  );
}

export default App;
