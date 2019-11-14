$(function () {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/'
    const apiKey = 'a56758b068e0436e0cacd6e5ef99693d';

    const $submitButton = $('#submit');

    $submitButton.on('click', (e) => {
        e.preventDefault();

        let city = $('#city').val();
        let country = $('#country').val(); 

        formValidation(city, country);

        getWeatherData(apiKey, city, country);

        if(city != '' && country != ''){
            $(e.target).parent().siblings('.current-weather').empty();
        }
        $(e.target).siblings('.error').fadeOut(5000);
    })

    function getWeatherData(key, city, country) {
        $.ajax({
            url: `${apiUrl}weather?q=${city},${country}&appid=${key}&units=metric`,
            type: "get"
        }).done(function (response) {
            console.log(response);
            showWeatherData(response);
        })
    }

    function formValidation(city, country){
        if (city === ''){
            const $cityError = $(`
                <p class='error city-error'>
                    Nazwa miasta jest wymagana!
                </p>`);
            $('.weather-form').append($cityError);
        }

        if (country === ''){
            const $countryError = $(`
                <p class='error country-error'>
                    Kod kraju jest wymagany!
                </p>`);
            $('.weather-form').append($countryError);
        }
    }

    function showWeatherData(city) {

        const [first, ...param] = city.weather;
        const $icon = first.icon;
        const $temp = city.main.temp.toFixed(1);

        const $newElement = $(`
            <div class='flex'>
                <h1>${city.name}</h1>
                <img src='http://openweathermap.org/img/wn/${$icon}@2x.png'>
            </div>
            <p>
                <span class='bold_text'>Temperatura: </span> 
                ${$temp} ℃
            </p>
            <p>
                <span class='bold_text'>Wiatr: </span> 
                ${city.wind.speed} m/s
            </p>
            <p>
                <span class='bold_text'>Ciśnienie: </span> 
                ${city.main.pressure} hPa
            </p>
        `);
        $('.current-weather').hide();
        $('.current-weather').append($newElement);
        $('.current-weather').fadeIn(2000);
    }
})