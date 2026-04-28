const TYPE_LABELS = {
  adult: "Adulto",
  child: "Niño",
  senior: "Jubilado",
};

function PassengerField({ index, field, label, value, error, onUpdate }) {
  const id = `${field}-${index}`;
  return (
    <div className="passenger-form__field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onUpdate(index, field, e.target.value)}
      />
      {error && <span className="passenger-form__error">{error}</span>}
    </div>
  );
}

function PassengerForm({ travelers, errors, onUpdate }) {
  return (
    <section className="passenger-form">
      <h2 className="passenger-form__title">Datos de los viajeros</h2>
      {travelers.map((t, i) => (
        <fieldset key={i} className="passenger-form__group">
          <legend className="passenger-form__legend">
            Viajero {i + 1} · {TYPE_LABELS[t.type]}
          </legend>
          <PassengerField
            index={i}
            field="name"
            label="Nombre"
            value={t.name}
            error={errors[`${i}-name`]}
            onUpdate={onUpdate}
          />
          <PassengerField
            index={i}
            field="lastname"
            label="Apellido"
            value={t.lastname}
            error={errors[`${i}-lastname`]}
            onUpdate={onUpdate}
          />
        </fieldset>
      ))}
    </section>
  );
}

export default PassengerForm;
