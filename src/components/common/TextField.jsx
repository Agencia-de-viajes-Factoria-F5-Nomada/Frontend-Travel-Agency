function TextField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
  required = false,
  autoComplete,
}) {
  const inputId = `field-${name}`;
  return (
    <div className="field">
      <label htmlFor={inputId} className="field__label">
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
      />
      {error && <span className="field__error">{error}</span>}
    </div>
  );
}

export default TextField;
