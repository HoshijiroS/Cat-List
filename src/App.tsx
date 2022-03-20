import React from 'react';
import './App.css';
import CatListComponent from './components/cat-list.component';
import CatComponent from './components/cat.component';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<CatListComponent />} />
        <Route path="/cats:id" element={<CatComponent />} />
        <Route path="/*" element={<CatListComponent />} />
      </Routes>
    </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
