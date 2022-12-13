import { useState } from "react";
import Popup from 'reactjs-popup';

function BudgetPopup() {
  return(
    <Popup
    trigger={<button className="button"> Budget Popup </button>}
    modal
    nested
    >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Budget </div>
        <div className="content">
          {' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
          Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
          delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
        </div>
        <div className="actions">
          <button
            className="button"
            onClick={() => {
              close();
            }}
          >
            Close Popup
          </button>
        </div>
      </div>
    )}
  </Popup>
  );
}

const RangeSlider = () => {

    const [rangeval, setRangeval] = useState(null);
    
    // hardcoded budget -> Anschluss and DB, pls don't hate me I am tired
    return (
      <div className="card">
        <label htmlFor="budget-range">Savings</label><br/>
        <label htmlFor="budget-range">600€/monthly</label>
        <input id="budget-range" type="range" className="budget-range" min="0" max="1500" 
         onChange={(event) => setRangeval(event.target.value)} />
        <h5>{rangeval}€</h5>
        <BudgetPopup/>
      </div>
    );
  };
  
  export default RangeSlider;