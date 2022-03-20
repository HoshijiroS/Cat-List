import React from 'react';
import './App.css';
import CatListComponent from './components/cat-list.component';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<CatListComponent />} />
      </Routes>
    </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
