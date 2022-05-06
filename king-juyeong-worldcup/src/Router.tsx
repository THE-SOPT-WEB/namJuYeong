import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Result from './pages/Result';
import Game from './pages/Game';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}
