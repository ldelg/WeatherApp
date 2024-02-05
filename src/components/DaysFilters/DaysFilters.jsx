import React from "react";
import "./DaysFilters.css";

const DaysFilters = ({ daysButtons, setIdx }) => {
  return (
    <div className="days-filters-container">
      {daysButtons &&
        daysButtons.map((list, index) => (
          <div key={index} className="day-filter">
            <label>{list.day}</label>
            <select onChange={(e) => setIdx(e.target.value)}>
              {list.weather.map((obj, timeIndex) => (
                  <option key={timeIndex} value={obj.index}>
                    {obj?.dt_txt.slice(11, 16)}
                  </option>
                ))}
            </select>
          </div>
        ))}
    </div>
  );
};

export default DaysFilters;
