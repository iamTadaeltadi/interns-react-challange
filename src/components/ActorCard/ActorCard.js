import React from 'react';
import { Link } from 'react-router-dom';
import { BsPersonFill, BsFillPersonCheckFill, BsFillPaletteFill } from 'react-icons/bs';
import ErrorBoundary from './../ErrorBoundary/ErrorBoundary'; 

function ActorCard({ actor }) {
  console.log(actor.name)
  return (
    <ErrorBoundary>
      <ActorCardContent actor={actor} />
    </ErrorBoundary>
  );
}

function ActorCardContent({ actor }) {
  if (!actor || !actor.name) {
    // Intentionally causing a runtime error
    throw new Error('Actor data is incomplete or undefined');
  }

  // If actor data is available, render the actor card content
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
