// ActorsList.js
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchActors } from '../utils/api';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import Loader from '../components/Loader/Loader';
import ActorCard from '../components/ActorCard/ActorCard';
import '../styles/ActorsList.css'

function ActorsList() {
  const [page, setPage] = useState(1);
  const { data: actorsData, isLoading, error } = useQuery(['actors', page], () => fetchActors(page), {
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  const actors = actorsData?.results || [];
  const hasNextPage = !!actorsData?.next;
  const hasPrevPage = !!actorsData?.previous;

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage(prevPage => prevPage - 1);
  };

  if (isLoading) return <Loader />;
  
  return (
    <div className="actors-list">
      <h1>Star Wars Actors</h1>
      {error && <ErrorBoundary>Error: {error.message}</ErrorBoundary>}
      {!error && (
        <>
          <div className="actor-cards">
            {actors.map(actor => (
              <ErrorBoundary key={actor.name}>
                <ActorCard actor={actor} />
              </ErrorBoundary>
            ))}
          </div>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={!hasPrevPage}>
              Previous
            </button>
            <button onClick={handleNextPage} disabled={!hasNextPage}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ActorsList;
