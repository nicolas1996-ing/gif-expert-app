import React from "react";

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
