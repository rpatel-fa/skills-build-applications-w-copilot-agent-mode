import { useEffect, useState } from 'react';
import { getApiBase } from '../apiBase';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${getApiBase()}/api/leaderboard/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setEntries(Array.isArray(data) ? data : (data.results ?? []));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-4">Loading leaderboard…</p>;
  if (error) return <p className="text-center text-danger mt-4">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      {entries.length === 0 ? (
        <p>No leaderboard entries found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Team</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e._id}>
                <td>{e.rank}</td>
                <td>{e.user?.username ?? e.user ?? '—'}</td>
                <td>{e.team?.name ?? e.team ?? '—'}</td>
                <td>{e.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Leaderboard;
