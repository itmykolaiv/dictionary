//Send request
function send_request(command, query, cb) {
  var baseUrl = 'https://wordsapiv1.p.mashape.com/words';
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

function build_list(letter, page) {
    page = page || 1;
    send_request('', 'page='+page+'&letterPattern='+encodeURIComponent('^'+letter+'.*$'), function(data) {
        var ul = document.querySelector('.js_list_words_ul');
        ul.innerHTML = '';
        for (var i = 0; i < data.results.data.length; i++) {
            var li = document.createElement('li');
            li.className = 'words';
            var a = document.createElement('a');
            a.href = '#explanation';
            a.className = 'js_word-detail';
            a.setAttribute('data-word', data.results.data[i]);
            a.innerHTML = data.results.data[i];
            li.append(a);
            ul.append(li);
        }
        if (page === 1) {
            build_pagenator(data.results.total, letter);
        }
        var words_links = document.querySelectorAll('.js_word-detail');
        for (var i = 0; i < words_links.length; i++) {
            words_links[i].addEventListener('click', function() {
                var word = this.innerText;
                build_definitions(word);
                build_examples(word);
                show_item('#explanation');
                hide_item('#js_list_words');
           });
        }
    });
}

function build_pagenator(total, letter) {
    var page = document.querySelector('.js_pagenator');
    var countP = parseInt(total/100);
    for (var i = 1; i <= countP; i++) {
        var button = document.createElement('button');
        button.value = i;
        button.innerHTML = i;
        button.className = 'js_next_page';
        page.append(button);
    }
    var page_buttons = document.querySelectorAll('.js_next_page');
    if (page_buttons) {
        for (var i = 0; i < page_buttons.length; i++) {
            page_buttons[i].addEventListener('click', function() {
                var pageN = this.value;
                build_list(letter, pageN);
                var active_button = document.querySelector('.js_pagenator button.active');
                if (active_button) {
                    active_button.classList.remove('active');
                }
                this.className = 'active';
           });
        }
    }
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