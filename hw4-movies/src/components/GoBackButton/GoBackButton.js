import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const GoBackButton = ({ onGoBack, location, history, match }) => (
  <ArrowBackIosIcon onClick={onGoBack} />
);

export default GoBackButton;
