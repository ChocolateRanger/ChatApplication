

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from './Component/Join/Join';
import Chat from './Component/Chat/Chat'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Join />}>
        </Route>
        <Route path="/chat" element={<Chat/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
