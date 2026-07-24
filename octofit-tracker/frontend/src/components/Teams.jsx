import { useEffect, useState } from 'react';
import { getApiBase } from '../apiBase';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${getApiBase()}/api/teams/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setTeams(Array.isArray(data) ? data : (data.results ?? []));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-4">Loading teams…</p>;
  if (error) return <p className="text-center text-danger mt-4">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p>No teams found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((t) => (
              <tr key={t._id}>
                <td>{t.name}</td>
                <td>
                  {Array.isArray(t.members)
                    ? t.members.map((m) => m?.username ?? m).join(', ')
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Teams;
