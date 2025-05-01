import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import "./PropertyCard.css";

const PropertyCard = (property) => {
  const descriptionToShow = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    } else {
      const truncatedText = description.substring(0, maxLength);
      return truncatedText + "...";
    }
  };

  return (
    <div className="col">
      <Link
        to={`/property/${property.item.id}/detail`}
        className="property-card-link"
      >
        <div className="property-card">
          <div className="property-image-container">
            <img
              src={"http://localhost:8080/api/property/" + property.item.image}
              className="property-image"
              alt={property.item.name}
            />
            <div className="property-rating">
              <FaStar className="star-icon" />
              <span>4.5</span>
            </div>
          </div>

          <div className="property-content">
            <div className="property-location">
              <FaMapMarkerAlt className="location-icon" />
              <span>{property.item.location.name}</span>
            </div>

            <h3 className="property-title">{property.item.name}</h3>
            
            <p className="property-description">
              {descriptionToShow(property.item.description, 100)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
