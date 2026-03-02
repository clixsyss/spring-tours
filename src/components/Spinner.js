/**
 * Reusable loading spinner (wheel). Use for any content loaded from the database.
 * @param {Object} props
 * @param {string} [props.label] - Optional text below the spinner (e.g. "Loading…")
 * @param {string} [props.className] - Optional extra class on the wrapper (e.g. "loading-spinner-block" for min-height)
 */
function Spinner({ label, className = "" }) {
  return (
    <div className={`loading-spinner ${className}`.trim()} role="status" aria-label={label || "Loading"}>
      <div className="loading-spinner-wheel" />
      {label && <p className="loading-spinner-label">{label}</p>}
    </div>
  );
}

export default Spinner;
