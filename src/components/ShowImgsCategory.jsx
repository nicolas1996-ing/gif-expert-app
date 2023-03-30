import React from "react";
import PropTypes, { object } from "prop-types"

export const ShowImgsCategory = ({ imageInfo }) => {
  return (
    <>
      <div className="card">
        <h4>{imageInfo.title}</h4>
        <img src={imageInfo.url} alt={imageInfo.url} />
      </div>
    </>
  );
};

ShowImgsCategory.propTypes = {
  imageInfo: PropTypes.object.isRequired
}
