$(document).ready(function () {
  const amenities = {};
  const states = {};
  const cities = {};
  let dat = {};
  $('input:checkbox.amen').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenities[$(this).data('id')];
    }
    let tex = '';
    if (!(Object.values(amenities).length)) {
      $('.amenities h4').replaceWith('<h4>&nbsp;</h4>');
    } else {
      tex = Object.values(amenities).join(', ');
      $('.amenities h4').html(tex);
    }
    console.log(amenities);
  });

  $('input:checkbox.cit').change(function () {
    if ($(this).is(':checked')) {
      cities[$(this).data('id')] = $(this).data('name');
    } else {
      delete cities[$(this).data('id')];
    }
    if (Object.values(cities).length) {
      $('.locations h4').html(Object.values(cities).join(', '));
    }
    console.log(cities);
  });

  $('input:checkbox.sta').change(function () {
    if ($(this).is(':checked')) {
      states[$(this).data('id')] = $(this).data('name');
    } else {
      delete states[$(this).data('id')];
    }
    console.log(Object.values(cities).length);
    if (Object.values(states).length) {
      $('.locations h4').html(Object.values(states).join(', '));
    } else {
      $('.locations h4').replaceWith('<h4>&nbsp;</h4>');
    }
    console.log(states);
  });

  const status = () => {
    $.ajax({
      type: 'GET',
      url: 'http://0.0.0.0:5001/api/v1/status/',
      success: (response) => {
        $('DIV#api_status').addClass('available');
      }
    }).fail(function (jqXHR, textStatus, error) {
      $('DIV#api_status').removeClass('available');
      $('DIV#api_status').css('background-color', '#CCCCCC');
    });
  };
  status();

  const search = () => {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify(dat),
      contentType: 'application/json',
      success: (response) => {
        response.forEach(place => {
          const item = `<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
                  <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}</div>
                  <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
          </div>
        </article>`;
          $('section.places').append(item);
        });
      }
    });
  };
  search();

  $('button').click(() => {
    if (!(Object.values(amenities).length) && !(Object.values(states).length) && !(Object.values(cities).length)) {
      dat = {};
      console.log(dat);
      $('.places').empty();
      search();
    } else {
      dat = { 
        amenities: Object.keys(amenities),
        states: Object.keys(states),
        cities: Object.keys(cities)
      };
      console.log(dat);
      console.log(typeof dat);
      $('.places').empty();
      search();
    }
  });
});
