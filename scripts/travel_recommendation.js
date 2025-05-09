const searchInput = document.getElementById('searchBar');
const recommendationButton = document.getElementById('recommendation-button');
const recommendationResult = document.getElementById('recommendation-result');

const suggestionTemplate = (item) => {
    return `<div class="suggestion">
                <img src="${item.imageUrl}" alt="${item.name}">
                <span>${item.name}</span>
                <p>${item.description}</p>
            </div>`;
};

const travelRecommendation = async () => {
    const data = await fetch('../api/travel_recommendation_api.json')
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching data:', error);
            recommendationResult.innerHTML = `<p>Failed to load recommendations. Please try again later.</p>`;
            return null;
        });

    if (!data) return;

    recommendationButton.addEventListener('click', () => {
        const searchValue = searchInput.value.toLowerCase();

        let allMatches = [];

        if (searchValue === 'temple') {
            allMatches = data.temples;
        } else if (searchValue === 'beach') {
            allMatches = data.beaches;
        } else if (searchValue === 'countries') {
            allMatches = data.countries.flatMap(country => country.cities);
        } else {
            const cityMatches = data.countries.flatMap(country =>
                country.cities.filter(city => city.name.toLowerCase().includes(searchValue))
            );
            const beachMatches = data.beaches.filter(beach =>
                beach.name.toLowerCase().includes(searchValue)
            );
            const templeMatches = data.temples.filter(temple =>
                temple.name.toLowerCase().includes(searchValue)
            );

            allMatches = [...cityMatches, ...beachMatches, ...templeMatches];
        }

        if (allMatches.length > 0) {
            recommendationResult.innerHTML = `<h3>Search Results</h3>
                <ul>${allMatches.map(item => `<li>${suggestionTemplate(item)}</li>`).join('')}</ul>`;
        } else {
            recommendationResult.innerHTML = `<p>No recommendations found for "${searchValue}".</p>`;
        }
    });
};

document.addEventListener('DOMContentLoaded', travelRecommendation);