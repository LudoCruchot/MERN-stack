import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlacesList";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world !",
    imageUrl:
      "https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Tour Eiffel",
    description: "The most iconic building in Europe",
    imageUrl:
      "https://images.pexels.com/photos/460740/pexels-photo-460740.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    address: "Champs de Mars, Paris 75007",
    location: {
      lat: 48.8560088,
      lng: 2.2882714,
    },
    creator: "u1",
  },
  {
    id: "p3",
    title: "La barquette",
    description: "Objectif du 501st PIR",
    imageUrl:
      "https://www.wikimanche.fr/images/thumb/6/6d/Stcome-1944-pontbarquette1.jpg/300px-Stcome-1944-pontbarquette1.jpg",
    address: "Dans les marais de Carentan",
    location: {
      lat: 49.32538,
      lng: -1.2455311,
    },
    creator: "u1",
  },
];

const UserPlaces = (props) => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserPlaces;
