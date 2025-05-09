const travelRecommendation = async () => {
    const countriesData = await fetch('../api/travel_recommendation_api.json')
        .then(response => response.json())
    const countryList = document.getElementById('country-list');
    const countrySelect = document.getElementById('country-select');
    const recommendationButton = document.getElementById('recommendation-button');
    const recommendationResult = document.getElementById('recommendation-result');

    countriesData.forEach(country => {
        const option = document.createElement('option');
        option.value = country.name;
        option.textContent = country.name;
        countrySelect.appendChild(option);
    });

    recommendationButton.addEventListener('click', () => {
        const selectedCountry = countrySelect.value;
        const recommendations = countriesData.find(country => country.name === selectedCountry).recommendations;
        recommendationResult.innerHTML = `<h3>Recommendations for ${selectedCountry}</h3><ul>${recommendations.map(rec => `<li>${rec}</li>`).join('')}</ul>`;
    });
}

document.addEventListener('DOMContentLoaded', travelRecommendation);

const getSearchResults = async (query) => {
    const response = await fetch('../api/travel_recommendation_api.json')
        .then(response => response.json())
    const data = response.filter(country => country.name.toLowerCase().includes(query.toLowerCase()));
    if (data.length === 0) {
        return [];
    }
    return data.results;
}