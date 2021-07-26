import React from 'react';
import './Filter.css';
const Filter = ({ value, handleChange }) => {
  return (
    <label className="label">
      Find contacts by name
      <input className="input-filter" type="text" value={value} onChange={handleChange} />
    </label>
  );
};
export default Filter;
