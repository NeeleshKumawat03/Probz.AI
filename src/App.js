import './App.css'
import React, { useState } from 'react';
import ChartComponent from './components/ChartComponent';
import jsonData from './data.json';
import TimeFrameSelector from './components/TimeFrameSelector';

const App = () => {
  const [filteredData, setFilteredData] = useState(jsonData);
  console.log(filteredData);
 
  return (
    <div>
      <h1 className='head'>Charting TimeFrame</h1>
      <TimeFrameSelector filteredData={filteredData} setFilteredData={setFilteredData}/>
      <ChartComponent data={filteredData} />
    </div>
  );
};

export default App;

