import React from "react";
import "./styles.scss";

const TagsList = ({ tags }) => {
  return tags.map((tag) => (tag ? <div className="tag">{tag}</div> : null));
};

export default TagsList;
