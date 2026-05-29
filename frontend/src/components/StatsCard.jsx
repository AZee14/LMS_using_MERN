const StatsCard = ({ icon, label, value, color }) => {
  return (
    <div className="stats-card" id={`stats-${label?.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="stats-icon" style={{ background: `linear-gradient(135deg, ${color}1a, ${color}33)`, color: color }}>
        {icon}
      </div>
      <div className="stats-info">
        <h3 className="stats-value">{value}</h3>
        <p className="stats-label">{label}</p>
      </div>
    </div>
  );
};

export default StatsCard;
