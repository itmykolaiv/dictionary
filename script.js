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
    if (search) {
        search.addEventListener('click', function() {
            var input = document.querySelector('.js_text-input');
            build_definitions(input.value);
            build_examples(input.value);
            show_item('#explanation');
            hide_item('#js_list_words');
        });
    }

    var letters = document.querySelectorAll('.js_alphabet button');
    if (letters) {
        for (var i = 0; i < letters.length; i++) {
            letters[i].addEventListener('click', function() {
                var letter = this.innerText;
                build_list(letter);
                hide_item('#explanation');
                show_item('#js_list_words');
           });
        }
    }
});
	