# jQuery-Weather-Plugin

* yarn init
* yarn bs
* localhost:3000
* in console write the following text - $('ul').weather()

For calling plugin take 2 parameters direction and array of cities.

Default options = {
  cities: ['Amsterdam', 'Bangkok', 'Vienna', 'München', 'Geneva', 'Lisbon', 'Mexico', 'Oslo', 'Tallinn', 'Paris'],
  direction: 'up',
}

Directions - 'up'(default) and 'down'.

Default array of cities - ['Amsterdam', 'Bangkok', 'Vienna', 'München', 'Geneva', 'Lisbon', 'Mexico', 'Oslo', 'Tallinn', 'Paris']

You can call plugin using only direction for example: $('ul').weather('down')

You can try with this array of cities - ['Moscow', 'Kiev', 'Petersburg', 'Sochi', 'Khabarovsk']

### Notification:

http://openweathermap.org/price - with a free API key no more than 60 calls per minute

There are 10 cities in default array (10 calls)
