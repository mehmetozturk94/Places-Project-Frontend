import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
      axios({
      method: "get",
      url: `http://localhost:3000/api/places/user/${userId}`,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        //handle success
        setLoadedPlaces(response.places);
      })
      .catch(function (response) {
        //handle error
        alert(response)
      });
  }, [userId]);

  const placeDeletedHandler = deletedPlaceId => {
    setLoadedPlaces(prevPlaces =>
      prevPlaces.filter(place => place.id !== deletedPlaceId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;