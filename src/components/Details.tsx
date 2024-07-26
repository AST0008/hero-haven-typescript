import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";

interface Hero {
  name: string;
  powers: string;
}


const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: hero, pending, error, refetch} = useFetch<Hero>(`http://localhost:8000/heros/${id}`);
  
  const [formData, setFormData] = useState({ name: '', powers: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (hero) {
      setFormData({ name: hero.name, powers: hero.powers });
    }
  }, [hero]);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    fetch(`http://localhost:8000/heros/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update hero");
      }
      return res.json();
    })
    .then((data) => {
      refetch();
      navigate("/");  
    })
    .catch((error) => {
      console.error("Error updating hero:", error);
      setIsSubmitting(false);
    });
  };

  if (pending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error || ""}</div>;
  }

  if (!hero) {
    return <div>Hero not found</div>;
  }

  return (
    <article className="hero-edit">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="powers"
          value={formData.powers}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </button>
      </form>
      <div className="hero-details">
        <h2>{hero.name}</h2>
        <p>Powers: {hero.powers}</p>
        <Link to="/">Back to Heroes</Link>
      </div>
    </article>
  );
};

export default Details;
