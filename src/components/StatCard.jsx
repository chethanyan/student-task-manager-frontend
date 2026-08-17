import './StatCard.css';

function StatCard({ title, value, color }) {
  return (
    <div className="stat-card" style={{ borderTopColor: color }}>
      <p className="stat-title">{title}</p>
      <p className="stat-value" style={{ color }}>{value}</p>
    </div>
  );
}

export default StatCard;