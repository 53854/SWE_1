import { useState } from "react";
import Popup from 'reactjs-popup';


const RangeSlider = () => {

  const [rangeval, setRangeval] = useState(null);

  // hardcoded budget -> Anschluss and DB, pls don't hate me I am tired
  return (
    <div className="card">
      <label htmlFor="budget-range">Savings</label><br />
      <label htmlFor="budget-range">600€/monthly</label>
      <input id="budget-range" type="range" className="budget-range" min="0" max="1500"
        onChange={(event) => setRangeval(event.target.value)} />
      <h5>{rangeval}€</h5>
    </div>
  );
};

export default RangeSlider;