'use strict';
/*

The old method of using XMLHttpRequest to make AJAX calls 

*/

// const getCountryData = function (country) {
//   const btn = document.querySelector('.btn-country');
//   const countriesContainer = document.querySelector('.countries');

//   ///////////////////////////////////////

//   const request = new XMLHttpRequest();

//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     const html = ` <article class="country">
// <img class="country__img" src="${data.flags.svg}" />
// <div class="country__data">
//   <h3 class="country__name">${data.name.official}</h3>
//   <h4 class="country__region">${data.region}</h4>
//   <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
//     1
//   )}</p>
//   <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
//   <p class="country__row"><span>💰</span>${
//     Object.values(data.currencies)[0].name
//   }</p>
// </div>
// </article>`;

// countriesContainer.insertAdjacentHTML('beforeend', html);
// countriesContainer.style.opacity = 1;
//   });
// };

// getCountryData('lanka');
// getCountryData('peru');

/*

The new method of making AJAX calls using the fetch method

*/

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = msg => {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const renderCountry = (data, neighbour) => {
  const html = ` <article class="country ${neighbour ? 'neighbour' : ''}">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.official}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${
        Object.values(data.languages)[0]
      }</p>
      <p class="country__row"><span>💰</span>${
        Object.values(data.currencies)[0].name
      }</p>
    </div>
    </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const getCountryData = country => {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country not found`);
      }

      return response.json();
    })

    .then(data => {
      renderCountry(data[0], false);
      const neighbour = data[0].borders[0];

      if (!neighbour) {
        return;
      }

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })

    .then(neighbourResponse => {
      if (!neighbourResponse.ok) {
        throw new Error(`Country not found`);
      }
      return neighbourResponse.json();
    })
    .then(data => {
      renderCountry(data[0], true);
    })

    .catch(error => {
      console.error(`${error} ❌❌❌ `);
      renderError('Something whent wrong !!! ❌❌❌');
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

//Calling the function

btn.addEventListener('click', function () {
  getCountryData('lanka');
});
