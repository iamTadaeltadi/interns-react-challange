import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchActorById, fetchFilmById } from '../utils/api';
import ErrorBoundary from '../components/ErrorBoundary';
import Loader from '../components/Loader';
import { BsPersonFill, BsFillPersonCheckFill, BsFillPaletteFill, BsFillEyeFill, BsGenderMale, BsGenderFemale, BsFilm } from 'react-icons/bs'; // Import required icons
import "../styles/ActorDetail.css" 

function ActorDetail() {
  const { id } = useParams();
  const history = useHistory();

  const { data: actor, isLoading, error } = useQuery(['actor', id], () => fetchActorById(id), {
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: films, isLoading: filmsLoading, error: filmsError } = useQuery(['films', actor?.films], () => Promise.all(actor?.films.map(fetchFilmById)), {
    enabled: !!actor,
  });

  const handleGoBack = () => {
    history.goBack();
  };

  if (isLoading || filmsLoading) return <Loader />;
  if (error || filmsError) return <ErrorBoundary>{error?.message || filmsError?.message}</ErrorBoundary>;

  return (
    <div className="actor-detail-container">
      <button className="back-button" onClick={handleGoBack}>Back</button>
      <div className="actor-detail">
        <h2 className="actor-name">{actor.name}</h2>
        <p className="actor-info"><BsPersonFill /> <span>Height:</span> {actor.height}Cm</p>
        <p className="actor-info"><BsFillPersonCheckFill /> <span>Mass:</span> {actor.mass}Kg</p>
        <p className="actor-info"><BsFillPaletteFill /> <span>Hair Color:</span> {actor.hair_color}</p>
        <p className="actor-info"><BsFillPaletteFill /> <span>Skin Color:</span> {actor.skin_color}</p>
        <p className="actor-info"><BsFillEyeFill /> <span>Eye Color:</span> {actor.eye_color}</p>
        <p className="actor-info">{actor.gender === 'male' ? <BsGenderMale /> : <BsGenderFemale />} <span>Gender:</span> {actor.gender}</p>
        <h3 className="actor-films-header">Films</h3>
        <ul className="actor-films-list">
          {films.map((film, index) => (
            <li key={index} className="actor-film-item">
              <p className="actor-film-description">{film.description}</p>
              <div className="actor-film-icon">
                <BsFilm size={20} style={{ marginRight: "10px" }} />

                <span >{film.title}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ActorDetail;
