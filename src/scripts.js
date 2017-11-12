// const text = ['Moscow', 'Petersburg', 'Khabarovsk', 'Sochi'];

$.fn.weather = function(opt) {
  const opts = typeof opt === 'string'
    ? {direction: opt}
    : opt
  const defaultOptions = {
    cities: ['Amsterdam', 'Bangkok', 'Vienna', 'München', 'Geneva', 'Lisbon', 'Mexico', 'Oslo', 'Tallinn', 'Paris'],
    direction: 'up',
  };
  const options = Object.assign({}, defaultOptions, opts);
  const key = 'b84d6e69b39e4433a5ec8239e157c1d5';
  const citiesArray = options.cities;
  const direction = options.direction;
  const citiesCollection = {};

  citiesArray.forEach((el) => {
    citiesCollection[el] = {};
  });

  const $listItems =  this.find('li');

  this.off('click.weatherAnimation', 'li');
  this.on('click.weatherAnimation', 'li' , animateElement);

  $listItems.each(function() {
    const $this = $(this);
    const itemText = $this.text();
    const cities = citiesArray.map((city) => ({city: city, index: itemText.indexOf(city)}));
    const indexes = cities.map((el) => el.index)
      .filter(index => index >= 0);
      console.log(indexes);
    const minIndex =  Math.min.apply(null, indexes);
    const city = cities.find((el) => el.index === minIndex);

    if (city) {
      citiesCollection[city.city].finded = true;
      $this.data('city', city.city);
    }
  });

  const citiesForRequests = citiesArray.filter((el) => citiesCollection[el].finded);
  citiesForRequests.forEach((city) => {
    const key = 'a44c2dfef327274d80867c1acd316197';
    const url = `//api.openweathermap.org/data/2.5/weather?appid=${key}&q=${city}&units=metric`;
    // const key = 'b84d6e69b39e4433a5ec8239e157c1d5';
    // const cnt = 1;
    // const url = `//api.openweathermap.org/data/2.5/forecast/daily?appid=${key}&q=${city}&units=metric&cnt=${cnt}`;

    $.getJSON(url, (data) => {
      const $li = $('li').filter(function(){
        return $(this).data('city') === city;
      });
      $li.each(function(){
        const $li = $(this);
        const text = $li.html();

        // const temp = data.list[0].temp.day.toFixed();
        const temp = data.main.temp.toFixed();
        const pattern = new RegExp(`(<strong>)?(${city})(\\s\\/\\s-?\\d+)?(<\\/strong>)?`, 'g');
        const newText = text.replace(pattern, `<strong>$2 / ${temp}</strong>`);
        $li.html(newText);
      })
    })
  })

  function animateElement() {
    const clicked = $(this);
    clicked.css({position: 'relative'});

    if (direction === 'down') {
      const $nextAll = clicked.nextAll();

      if ($nextAll.length > 0) {
        const clickedHeight = clicked.outerHeight();
        const $firstElement = $($nextAll[0]);
        const $lastElement = $($nextAll[$nextAll.length - 1]);
        const moveHeight = ($lastElement.offset().top + $lastElement.outerHeight()) - $firstElement.offset().top;
        const moveDown = moveHeight;
        const moveTop = clickedHeight;

        clicked.animate({top: moveDown}, 400);
        $nextAll.css({position: 'relative'});
        $nextAll.animate({top: -moveTop}, 400, function() {
          clicked.parent().append(clicked);
          clicked.css({position: 'static', top: 0});
          $nextAll.css({position: 'static', top: 0});
        });
      }
    }
    else {
      const $previousAll = clicked.prevAll();

      if ($previousAll.length > 0) {
        const clickedHeight = clicked.outerHeight();
        const $firstElement = $($previousAll[$previousAll.length - 1]);
        const $lastElement = $($previousAll[0]);
        const moveHeight = ($lastElement.offset().top + $lastElement.outerHeight()) - $firstElement.offset().top;
        const moveTop = moveHeight;
        const moveDown = clickedHeight;

        clicked.animate({'top': -moveTop}, 400);
        $previousAll.css('position', 'relative');
        $previousAll.animate({'top': moveDown}, 400, function() {
          clicked.parent().prepend(clicked);
          clicked.css({'position': 'static', 'top': 0});
          $previousAll.css({'position': 'static', 'top': 0});
        });
      }
    }
  }
}
