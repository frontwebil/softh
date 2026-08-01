import './style.css'

export function Loader() {
  return (
    <div className="fullscreen-loader">
      <div className="loader-spinner" />
      <p>Зберігаємо зміни...</p>
    </div>
  );
}