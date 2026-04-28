function Counter({ label, value, onChange }) {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(Math.max(0, value - 1));

  return (
    <div className="counter">
      <label className="counter__label">{label}</label>
      <div className="counter__controls">
        <button
          onClick={decrement}
          className="counter__button counter__button--minus"
          aria-label="Decrementar"
        >
          −
        </button>
        <span className="counter__value">{value}</span>
        <button
          onClick={increment}
          className="counter__button counter__button--plus"
          aria-label="Incrementar"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Counter;
