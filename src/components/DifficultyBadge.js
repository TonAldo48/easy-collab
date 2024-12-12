export default function DifficultyBadge({ difficulty }) {
  const colors = {
    Easy: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Hard: 'bg-red-100 text-red-800',
    default: 'bg-gray-100 text-gray-800'
  };

  const badgeColor = colors[difficulty] || colors.default;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColor}`}>
      {difficulty}
    </span>
  );
} 