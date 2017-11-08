//Send request
function send_request(command, query, cb) {
  var baseUrl = 'http://ec2-52-14-195-100.us-east-2.compute.amazonaws.com/dictionary';
  var myHeaders = new Headers();
  myHeaders.append("X-Mashape-Key", "zd1IXUWYTnmshVbob13BKiSwWEKdp1PfBb3jsnC4LZHFgUehE1");

  fetch(baseUrl + '/' + command + '?' + query, {headers: myHeaders})
      .then(function(response) {
          return response.json();
      })
      .then(cb)
      .catch( function() {
          console.log("Somthing wrong!!!");
      });
}

function build_definitions(word) {
    send_request(word + '/definitions', '', function(data) {
        var defs = document.querySelector('.js_definitions');
        var searched_word = document.querySelector('.js_searched-word');
        defs.innerHTML = '';
        searched_word.innerHTML = data.word;
        for (var i = 0; i < data.definitions.length; i++) {
            var h4_partOfSpeech = document.createElement('h4');
            h4_partOfSpeech.innerHTML = data.definitions[i].partOfSpeech;
            defs.append(h4_partOfSpeech);
            var div_one_def = document.createElement('div');
            div_one_def.className = 'word-definition';
            div_one_def.innerHTML = data.definitions[i].definition;
            defs.append(div_one_def);
        }
    });
}

function build_examples(word) {
    send_request(word + '/examples', '', function(data) {
        var examples = document.querySelector('.js_examples');
        examples.innerHTML = '';
        var ul = document.createElement('ol');
        for (var i = 0; i < data.examples.length; i++) {
            var li = document.createElement('li');
            li.innerHTML = data.examples[i];
            ul.append(li);
        }
        examples.append(ul);
    });
}

function build_list(letter) {
    send_request('', 'letterPattern='+encodeURIComponent('^'+letter+'.*$'), function(data) {
        var list = document.querySelector('#js_list_words');
        list.innerHTML = '';
        var ul = document.createElement('ul');
        for (var i = 0; i < data.results.data.length; i++) {
            var li = document.createElement('li');
            li.className = 'words';
            var a = document.createElement('a');
            a.href = '#';
            a.className = 'js_word-detail';
            a.setAttribute('data-word', data.results.data[i]);
            li.append(a);
            ul.append(li);
        }
        list.append(ul);
    });
}

function show_item(item) {
    var $item = document.querySelector(item);
    if ($item.classList.contains('hide')) {
        $item.classList.remove('hide');
        $item.classList.add('show');
    }
}

function hide_item(item) {
    var $item = document.querySelector(item);
    if ($item.classList.contains('show')) {
        $item.classList.remove('show');
        $item.classList.add('hide');
    }
}