(function(){

  "use strict";

  var movie = [
    {
      "year": 2006,
      "title": "The Departed"
    },
    {
      "year": 2007,
      "title": "No Country for Old Men"
    },
    {
      "year": 2008,
      "title": "Slumdog Millionaire"
    },
    {
      "year": 2009,
      "title": "The Hurt Locker"
    },
    {
      "year": 2010,
      "title": "The King's Speech"
    },
    {
      "year": 2011,
      "title": "The Artist"
    },
    {
      "year": 2012,
      "title": "Argo"
    },
    {
      "year": 2013,
      "title": "12 Years a Slave"
    },
    {
      "year": 2014,
      "title": "Birdman or (The Unexpected Virtue of Ignorance)"
    },
    {
      "year": 2015,
      "title": "Spotlight"
    }
  ];

  // Generate data to table row
  var createRow = function(val1, val2){
    return '<tr><td>'+ val1 +'</td><td>'+ val2 +'</td></tr>';
  };

  // (Re)build tr into tbody
  var createTbody = function(){
    // Empty tbody to rebuild tbody with new data
    var $tbody = $('tbody');
    if($tbody.children().length > 0){
      $tbody.empty();
    }
    var tbody = '<tbody>';
    movie.map(function(movie){
      tbody += createRow(movie.year, movie.title);
    });
    tbody += '</tbody>';
    $('#movie').append(tbody);
  };

  // Create tbody from initial array
  createTbody();

  var submitInfo = function(){
    var $year = $('#year'),
        $title = $('#title'),
        $inputButton = $('.input-wrapper button');

    function appendToLastItem(){
      var lastItem = movie[movie.length -1],
          newList = createRow(lastItem.year, lastItem.title);
      $('#movie > tbody:last-child').append(newList);
    }

    // Anable submit button
    $('.text-input').keyup(function(){
      var yearVal = $year.val();
      if($title.val().length > 0 && Math.floor(yearVal) == yearVal){
         $inputButton.prop('disabled', false);
      }
    });

    // Submit the info
    $inputButton.click(function(e){
      e.preventDefault();
      movie.push({'year': $year.val(), 'title': $title.val()});
      appendToLastItem();
      $inputButton.prop('disabled', true);
      $year.val('');
      $title.val('');
    });
  };

  submitInfo();

  // shuffle array
  var shuffle = function(array) {
    var randomNum, x, i;
    for (i = array.length; i; i--) {
        randomNum = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[randomNum];
        array[randomNum] = x;
      }
  };

  //Sort array
  $('.sort button').click(function(e){
    e.preventDefault();
    var buttonData = $(this).data('button');

    if(buttonData === 'number'){
      movie.sort(function(a, b){
         return (a.year > b.year) ? -1 : ((b.year > a.year) ? 1 : 0);
      });
      createTbody();
    } else if (buttonData === 'letter') {
      movie.sort(function(a, b){
        return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);
      });
      createTbody();
    } else if (buttonData === 'random') {
      shuffle(movie);
      createTbody();
    }
  });

})();
