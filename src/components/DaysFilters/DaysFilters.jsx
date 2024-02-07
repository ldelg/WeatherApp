import React from "react";
import "./DaysFilters.css";

const DaysFilters = ({ daysButtons, setIdx }) => {
  return (
    <div className="days-filters-container buttons-group">
      {daysButtons &&
        daysButtons.map((list, index) => (
          <div key={index} className="day-filter general-button">
            <label className="label">
              {list.day}
            </label>
            <select className="options-bar"onChange={(e) => setIdx(e.target.value)}>
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
