
angular.module('movieFinder', [])
  .controller('movieCtrl', function($scope, $http){
    $scope.$watch('search', function() {
      fetch(); //watches the search input which refreshes every 800ms
    });

//function called every 800ms to perform AJAX call
 function fetch(){

  //the results only return a partial img path so this is added to provide the full url to display the poster... those tricksters!
    var imgPath = "https://image.tmdb.org/t/p/w185/"    

    //defining the search value from the input
    var search = $("#search").val();
    console.log(search)
    //this query allows users to search by title which is input by the user
    $http.get('https://api.themoviedb.org/3/search/movie?api_key=aa8b43b8cbce9d1689bef3d0c3087e4d&query='+ search)
      .then(function(response){ 

        //title of first movie in results array
        $scope.title = response.data.results[0].original_title; 
        console.log($scope.title)

        //synopsis of the movie
        $scope.overview = response.data.results[0].overview;

        //img path for poster
        $scope.poster = imgPath + response.data.results[0].poster_path;
        console.log($scope.poster);

        //the voter average for the movie returned
        $scope.rating = 'Rating: '+ response.data.results[0].vote_average;
      });
 }
})