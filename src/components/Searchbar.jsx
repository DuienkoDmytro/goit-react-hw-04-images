import { useState } from 'react';
import css from './service/styles.module.css';

export const Searchbar = ({ handleSubmit }) => {
  const [searchRequiring, setsearchRequiring] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    handleSubmit(searchRequiring);
  };
  const onChange = e => {
    setsearchRequiring(e.target.value);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={css.SearchForm_button}>
          <span className={css.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={css.SearchForm_input}
          type="text"
          name="searchQuery"
          value={searchRequiring}
          onChange={onChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
