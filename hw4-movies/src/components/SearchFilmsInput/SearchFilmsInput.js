import React from "react";
import PropTypes from "prop-types";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import css from "./SearchFilmsInput.module.css";

const SearchFilmsInput = ({ onSubmit, onInputChange, value }) => (
  <form onSubmit={onSubmit} className={css.inputForm}>
    <SearchIcon color="secondary" className={css.searchIconLeft} />
    <Input
      color="secondary"
      className={css.input}
      onInput={onInputChange}
      value={value}
    />
  </form>
);

export default SearchFilmsInput;

SearchFilmsInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

SearchFilmsInput.defaultProps = {
  onInputChange: function (e) {
    alert("Something went wrong... Try to reload this page");
  },
  onSubmit: function (e) {
    e.preventDefault();
    alert("Something went wrong... Try to reload this page");
  },
  value: "",
};
