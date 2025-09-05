const users = [
  { name: "Aarav", points: 980, badge: "Guru" },
  { name: "Isha", points: 890, badge: "Mentor" },
  { name: "Ravi", points: 820, badge: "Pro" },
  { name: "Tara", points: 790, badge: "Rising" },
];

export default function LeaderboardPage() {
  return (
    <div className="container py-10">
      <h2 className="text-2xl font-bold">Leaderboard</h2>
      <div className="mt-6 overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-2 text-left">Rank</th>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Badge</th>
              <th className="px-4 py-2 text-left">Points</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u.name} className="border-t">
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2 font-medium">{u.name}</td>
                <td className="px-4 py-2">{u.badge}</td>
                <td className="px-4 py-2">{u.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
