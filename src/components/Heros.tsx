import React from "react";
import { Link } from "react-router-dom";
import useFetch from "./useFetch";

interface Hero {
  id: number;
  name: string;
  powers: string;
}

interface HerosProps {
//   onClick: () => void;
}

const Heros: React.FC<HerosProps> = () => {
  const { data: heroes, pending, error } = useFetch<Hero[]>("http://localhost:8000/heros");

  return (
    <div>
      {pending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {heroes && (
        <article>
          {heroes.map((hero) => (
            <div className="heros-cards" key={hero.id}>
              <div className="card-inner">
                <div className="card-front">
                  <div className="heros-img">
                    <img
                      src={require(`../assets/${hero.name.toLowerCase()}.jpg`).default}
                      alt={hero.name}
                      height={150}
                    />
                  </div>
                </div>
                <div className="card-back">
                  <h2>{hero.name}</h2>
                  <p>{hero.powers}</p>
                  {/* <button onClick={onClick}>Edit</button> */}
                  <Link to={`/heros/${hero.id}`}>Edit Details</Link>
                </div>
              </div>
            </div>
          ))}
        </article>
      )}
    </div>
  );
};

export default Heros;
