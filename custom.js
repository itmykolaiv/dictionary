//Send request
function send_request(command) {
    var myHeaders = new Headers();
    myHeaders.append("X-Mashape-Key", "zd1IXUWYTnmshVbob13BKiSwWEKdp1PfBb3jsnC4LZHFgUehE1");
    fetch('http://ec2-52-14-195-100.us-east-2.compute.amazonaws.com/dictionary/' + command, {headers: myHeaders})
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
      })
      .catch( function() {
        console.log("Somthing wrong!!!");
      });
  }
  

