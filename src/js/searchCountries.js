import countriesList from '../templates/countries-list.hbs';
import countryCard from '../templates/country-card.hbs';
import refs from './refs';
import '@pnotify/core/dist/BrightTheme.css';
import fetchCountries from './fetchCountries';
import { error } from '@pnotify/core';
import debounce from 'lodash.debounce';
// import _ from 'lodash';

refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  event.preventDefault();

  clearCountriesListContainer();
    
  const countriesNamesList = event.target.value;
  
  if (countriesNamesList === '') {
    clearCountriesListContainer();    
    return;
  };      

  fetchCountries(countriesNamesList).then(countriesList => {
    if (countriesList === undefined) {
      clearCountriesListContainer();
      
      error({
        text: "No such country found. Please re-enter query!",        
        width: '400px',
        hide: true,
        delay: 1000,
        sticker: false,
        closer: false,
        remove: true,
        destroy: true,
      });
      
      return;
    };

    if (countriesList.length === 1) {      
      appendCountryCardMarkup(countriesList);
      return;
    };    

    if (countriesList.length > 10) {
      clearCountriesListContainer();      
      
      error({
        text: "Too many matches found. Please enter a more specific query!",        
        width: '400px',
        hide: true,
        delay: 1000,
        sticker: false,
        closer: false,
        remove: true,
        destroy: true,
      });
      
      return;
    };        

    appendCountriesListMarkup(countriesList);       
  });   
};

function appendCountriesListMarkup(name) {
  refs.countriesListContainer.insertAdjacentHTML('beforeend', countriesList(name));
};

function appendCountryCardMarkup(card) {
  refs.countryCardContainer.insertAdjacentHTML('beforeend', countryCard(card));
};

function clearCountriesListContainer() {
  refs.countriesListContainer.innerHTML = '';
  refs.countryCardContainer.innerHTML = ''; 
};
