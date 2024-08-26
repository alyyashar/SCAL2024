// src/components/Dashboard/ContractMonitor.js
import React, { useState, useEffect } from 'react';
import { fetchContractEvents } from '../../../services/apiService'; // Ensure this path is correct

const ContractMonitor = ({ contractAddress }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      setLoading(true); // Ensure loading is true before making the request
      try {
        if (contractAddress) {
          const data = await fetchContractEvents(contractAddress);
          setEvents(data);
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching events.");
      } finally {
        setLoading(false);
      }
    };

    getEvents(); // Call the async function
  }, [contractAddress]);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error}</p>;

  return (
    <div>
      <h3>Contract Events</h3>
      {events.length > 0 ? (
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <strong>{event.name || 'Unknown Event'}</strong>: {event.description || 'No description available'}
            </li>
          ))}
        </ul>
      ) : (
        <p>No events found for this contract.</p>
      )}
    </div>
  );
};

export default ContractMonitor;
