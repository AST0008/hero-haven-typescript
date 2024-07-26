import React from "react";
import useFetch from "./useFetch";

interface Hero {
  id: number;
  name: string;
  powers: string;
}

const Dashboard: React.FC = () => {
  const { data: heroesData, pending, error } = useFetch<Hero[]>("http://localhost:8000/heros");

  if (pending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const heroes = heroesData || [];

  return (
    <div className="dashboard">
      <div className="cards">
        {heroes.slice(0, 4).map(hero => (
          <div className="card" key={hero.id}>
            <div className="hero-img">
              <img
                src={require(`../assets/${hero.name.toLowerCase()}.jpg`).default}
                alt={hero.name}
                height={150}
              />
            </div>
            <h3>{hero.name}</h3>
            <p>Powers: <br />
              {hero.powers}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
