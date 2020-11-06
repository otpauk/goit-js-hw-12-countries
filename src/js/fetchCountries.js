const BASE_URL = 'https://restcountries.eu/rest/v2/name';

export default function fetchCountries(searchQuery) {
  const url = `${BASE_URL}/${searchQuery}`;

  // *Alternative Variant*
  // return fetch(url)
  //   .then(response => response.ok ? response.json() : Promise.reject(response.status + ' - no such country!'))
  //   .then(countriesList => countriesList)
  //   .catch(error => console.log('Error is: ', error)); 
    
  return fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    else {
      throw Error(response.status + ' - no such country!');
    }
  })
    .then((countriesList) => {
      return countriesList;
  })
    .catch((error) => {
      console.log(error);
  });
};