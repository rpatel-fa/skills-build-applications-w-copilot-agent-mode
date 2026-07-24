import { useEffect, useState } from 'react';
import { getApiBase } from '../apiBase';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${getApiBase()}/api/workouts/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setWorkouts(Array.isArray(data) ? data : (data.results ?? []));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-4">Loading workouts…</p>;
  if (error) return <p className="text-center text-danger mt-4">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((w) => (
              <tr key={w._id}>
                <td>{w.title}</td>
                <td>{w.description}</td>
                <td>{w.difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Workouts;
