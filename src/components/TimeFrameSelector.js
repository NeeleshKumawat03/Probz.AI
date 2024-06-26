import React from 'react'
import jsonData from '../data.json';

const TimeFrameSelector = ({filteredData, setFilteredData}) => {
    let newData = [];
  

    const handleTimeframeChange = (timeframe) => {
  
      switch (timeframe) {
        case 'daily':
          newData = jsonData; // Show data as it is for daily
          break;
        case 'weekly':
          newData = aggregateDataWeekly(jsonData); // Aggregate data weekly
          break;
        case 'monthly':
          newData = aggregateDataMonthly(jsonData); // Aggregate data monthly
          break;
        default:
          newData = jsonData; // Default to original data if no valid timeframe is selected
          break;
      }
  
      setFilteredData(newData);
    };
  
    const aggregateDataWeekly = (data) => {
        console.log(data);
      // Function to aggregate data weekly
      const aggregatedData = [];
      let currentWeek = null;
      let weekValues = [];
      for (let i = 0; i < data.length; i++) {
        const date = new Date(data[i].timestamp);
        const week = `${date.getFullYear()}-${getWeekNumber(date)}`;
        if (currentWeek === null) {
          currentWeek = week;
        }
        if (week === currentWeek) {
          weekValues.push(data[i].value);
        } else {
          aggregatedData.push({
            timestamp: currentWeek,
            value: weekValues.reduce((acc, val) => acc + val, 0) / weekValues.length // Calculate average
          });
          currentWeek = week;
          weekValues = [data[i].value];
        }
      }
      // Push last week data
      if (weekValues.length > 0) {
        aggregatedData.push({
          timestamp: currentWeek,
          value: weekValues.reduce((acc, val) => acc + val, 0) / weekValues.length // Calculate average
        });
      }
      return aggregatedData;
    };
  
    const aggregateDataMonthly = (data) => {
        console.log(data);
      // Function to aggregate data monthly
      const aggregatedData = [];
      let currentMonth = null;
      let monthValues = [];
      for (let i = 0; i < data.length; i++) {
        const date = new Date(data[i].timestamp);
        const month = `${date.getFullYear()}-${date.getMonth() + 1}`;
        if (currentMonth === null) {
          currentMonth = month;
        }
        if (month === currentMonth) {
          monthValues.push(data[i].value);
        } else {
          aggregatedData.push({
            timestamp: currentMonth,
            value: monthValues.reduce((acc, val) => acc + val, 0) / monthValues.length // Calculate average
          });
          currentMonth = month;
          monthValues = [data[i].value];
        }
      }
      // Push last month data
      if (monthValues.length > 0) {
        aggregatedData.push({
          timestamp: currentMonth,
          value: monthValues.reduce((acc, val) => acc + val, 0) / monthValues.length // Calculate average
        });
      }
      return aggregatedData;
    };
  
    // Helper function to get week number
    const getWeekNumber = (date) => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() + 4 - (d.getDay() || 7));
      const yearStart = new Date(d.getFullYear(), 0, 1);
      const weekNumber = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
      return weekNumber;
    };
  
  return (
    <div className='timeFrameContainer'>
        <button className='timeframeBtn' onClick={() => handleTimeframeChange('daily')}>Daily</button>
        <button className='timeframeBtn' onClick={() => handleTimeframeChange('weekly')}>Weekly</button>
        <button className='timeframeBtn' onClick={() => handleTimeframeChange('monthly')}>Monthly</button>
    </div>
  )
}

export default TimeFrameSelector