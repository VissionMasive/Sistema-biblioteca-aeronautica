export default function Select({ label, list, onChange, valor }) {
  if (!list || !onChange || valor === undefined) return null;

  const isArrayOfObjects =
    Array.isArray(list) && list.length > 0 && typeof list[0] === "object";

  return (
    <select
      className="border rounded p-2"
      value={valor}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{label}</option>
      {Array.isArray(list) &&
        list.map((l) =>
          isArrayOfObjects ? (
            <option key={l.id} value={l.nombre}>
              {l.nombre}
            </option>
          ) : (
            <option key={l} value={l}>
              {l}
            </option>
          )
        )}
    </select>
  );
}
