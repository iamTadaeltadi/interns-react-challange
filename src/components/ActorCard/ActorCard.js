import React from 'react';
import { Link } from 'react-router-dom';
import { BsPersonFill, BsFillPersonCheckFill, BsFillEyeFill, BsFillPaletteFill, BsGenderMale, BsGenderFemale } from 'react-icons/bs'; // Import required icons

function ActorCard({ actor }) {
  return (
    <div className="actor-card">
      <div className="actor-info">
        <h2 className="actor-name">{actor.name}</h2>
        <p><BsPersonFill /> Height: {actor.height}Cm</p>
        <p><BsFillPersonCheckFill /> Mass: {actor.mass}Kg</p>
        <p><BsFillPaletteFill /> Hair Color: {actor.hair_color}</p>

      </div>
      <Link to={`/actor/${actor.url.split('/').slice(-2, -1)[0]}`} className="actor-link">
        View Details
      </Link>
    </div>
  );
}

export default ActorCard;
