// const text = ['Moscow', 'Kiev', 'Petersburg', 'Sochi', 'Habarovsk'];

$.fn.weather = function(direction = 'up', arr) {
  const defaultCities = ['Amsterdam', 'Bangkok', 'Vienna', 'Munich', 'Geneva', 'Lisbon', 'Mexico', 'Oslo', 'Tallinn', 'Paris'];
  const key = 'b84d6e69b39e4433a5ec8239e157c1d5';
  const citiesArray = arr || defaultCities;
  const citiesCollection = {};

  citiesArray.forEach((el) => {
    citiesCollection[el] = {};
  });

  const $listItems =  this.find('.list__item');

  $listItems.each(function() {
    const $this = $(this);
    const itemText = $this.text();
    const cities = citiesArray.map((city) => ({city: city, index: itemText.indexOf(city)}));
    const indexes = cities.map((el) => el.index)
      .filter(index => index >= 0);
    const minIndex =  Math.min.apply(null, indexes);
    const city = cities.find((el) => el.index === minIndex);

    if (city) {
      citiesCollection[city.city].finded = true;
      $this.data('city', city.city);
    }
  });

  const citiesForRequests = citiesArray.filter((el) => citiesCollection[el].finded);
  citiesForRequests.forEach((city) => {
    const url = `//api.openweathermap.org/data/2.5/weather?appid=${key}&q=${city}&units=metric`;

    $.getJSON(url, (data) => {
      const $li = $('.list__item').filter(function(){
        return $(this).data('city') === city;
      });

      $li.each(function(){
        const $li = $(this);
        const text = $li.html();
        const temp = data.main.temp.toFixed();
        const pattern = new RegExp(`(<strong>)?(${city})(\\s\\/\\s-?\\d+)?(<\\/strong>)?`, 'g');
        const newText = text.replace(pattern, `<strong>$2 / ${temp}</strong>`);
        $li.html(newText);
      })
    })
  })

  $listItems.click(function() {
    $(this).parent().prepend(this);
    if (direction === 'down') {
      $(this).parent().append(this);
    }
  });
}
