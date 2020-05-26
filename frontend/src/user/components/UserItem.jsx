import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../shared/components/UIElements/Avatar.jsx";
import Card from "../../shared/components/UIElements/Card.jsx";
import "./UserItem.css";

const ASSET_URL = process.env.REACT_APP_ASSET_URL;

const UserItem = (props) => {
  const { id, name, image, placeCount } = props;
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar image={`${ASSET_URL}/${image}`} alt={name} name={name} />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
