document.addEventListener("DOMContentLoaded", function() {
    var $alpha = document.querySelector('.js_alphabet');
    if ($alpha) {
        var alphabet = "abcdefghijklmnopqrstuvwxyz".split('');
        for(var i in alphabet) {
            var $button = document.createElement("button");
            $button.className = 'btn-letter';
            var t = document.createTextNode(alphabet[i]);
            $button.appendChild(t);
            $alpha.appendChild($button);
        }
    }
    var search = document.querySelector('.js_search-btn');
    search.addEventListener('click', function() {
        var input = document.querySelector('.js_text-input');
        var word = input.value;
        send_request(word + '/definitions', '', function(data) {
            var expl = document.querySelector('#explanation');
            var word_div = document.createElement('div');
            word_div.innerHTML = data.word + ':';
            expl.append(word_div);
            var div_defs = document.createElement('div');
            for (var i = 0; i < data.definitions.length; i++) {
                var div_one_def = document.createElement('div');
                div_one_def.className = 'word-definition';
                div_one_def.innerHTML = data.definitions[i].definition;
                expl.append(div_one_def);
            }
        });
        
    });
});