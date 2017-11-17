(function(){
  var searchResults;
  var searchQuery;
  var apiUrl;
  var searchKeys = document.getElementById('search-item');
  searchKeys.focus();
  var searchTrigger = document.getElementById('get-article');

  function displayMatches(data, listClass, displayDetail) {
     for (var i=0; i<data.length; i++) {
      var results = '<li class = "'+listClass+'"><a href = "https://en.wikipedia.org/wiki/' + data[i].title + '" target = "_blank"><span>' + data[i].title + '</span><span style = "display: '+displayDetail+' ">'+ data[i].snippet + '...</span></a></li>';
      document.getElementById('search-lists').innerHTML += results;

    }
  }
  function getMatchesDetails(data, listClass, displayDetail) {
    for (var i=0; i<data.length; i++) {
     var results = '<li class = "'+listClass+'"><a href = "https://en.wikipedia.org/wiki/' + data[i].title + '" target = "_blank"><span class = "article-title">' + data[i].title + '</span><span style = "display: '+displayDetail+' ">'+ data[i].snippet + '...</span></a></li>';
     document.getElementById('search-results').innerHTML += results;

   }
  }

  var searchRequest = {
    ajax: function(apiUrl) {
      return $.ajax({
        method: 'GET',
        cache: false,
        dataType: "jsonp",
        url: apiUrl
      });
    }

  };
  searchTrigger.addEventListener('click', searchForResults);


  function searchForResults() {

  searchKeys.blur();
  document.getElementById('search-lists').style.display = 'none';
  document.getElementById('search-lists').innerHTML = '';
  document.getElementById('search-results').innerHTML = '';
  searchQuery = searchKeys.value;
  apiUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + searchQuery +'&utf8=&format=json&callback=';

  if (searchQuery.length >= 1) {
    document.getElementById('search-item').blur();

    document.getElementById('search-function').style.position = 'relative';
    document.getElementById('search-lists').style.position = 'absolute';
    document.getElementById('search-lists').style.left = '0px';
    document.getElementById('search-lists').style.right = '0px';


    document.getElementById('search-results').style.display = 'block';

    searchRequest.ajax(apiUrl).done(function(data){
      data = data.query.search;
      var displayDetail = 'block';
      var listClass = 'search-list-items';
      getMatchesDetails(data,listClass, displayDetail);
    });
  }
  }
  searchKeys.addEventListener('keyup', function(){
    document.getElementById('search-lists').innerHTML = '';
    searchQuery = searchKeys.value;
    apiUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=' + searchQuery +'&utf8=&format=json&callback=';
    if (searchQuery.length >= 1) {
      if (event.keyCode === 13) {
        searchForResults();
      }
      else {
        document.getElementById('search-lists').style.display = 'block';

        searchRequest.ajax(apiUrl).done(function(data){
          data = data.query.search;
          var displayDetail = 'none';
          var listClass = 'mini-search-list-items';
          displayMatches(data, listClass, displayDetail);
        });
      }

    }
  });
})();
