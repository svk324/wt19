!(function (e, t) {
    "use strict";

    var i = {
        init: function () {

            elementorFrontend.hooks.addAction( 'frontend/element_ready/rivax-fancy-text.default', i.Fancy_Animated_Text );
        },
        Fancy_Animated_Text: function (t) {
            t.find('.rivax-fancy-text-list').addClass('initialized');
            let i = t.find(".rivax-fancy-text").data("animation-settings");
            let n = i.animationDelay,
                a = i.loadingBar,
                s = a - 3e3,
                o = i.lettersDelay,
                l = i.typeLettersDelay,
                r = i.duration,
                d = r + 800,
                c = i.revealDuration,
                p = i.revealAnimationDelay;

            function animateFancyText() {
                var i, o;
                t
                    .find(".rivax-fancy-text.letters")
                    .find("b")
                    .each(function () {
                        var t = e(this),
                            i = t.text().split(""),
                            n = t.hasClass("is-visible");
                        for (let e in i) " " == i[e] && (i[e] = "&nbsp;"), t.parents(".rotate-2").length > 0 && (i[e] = "<em>" + i[e] + "</em>"), (i[e] = n ? '<i class="in">' + i[e] + "</i>" : "<i>" + i[e] + "</i>");
                        var a = i.join("");
                        t.html(a);
                    });
                i = t.find(".rivax-fancy-text");
                o = n;

                i.each(function () {
                    var t = e(this);
                    if (t.hasClass("bar-loading")) {
                        o = a;
                        setTimeout(function () {
                            t.find(".rivax-fancy-text-list").addClass("is-loading");
                        }, s);
                    }
                    else if (t.hasClass("clip")) {
                        var i = t.find(".rivax-fancy-text-list"),
                            n = i.width() + 10;
                        i.css("width", n);
                    }
                    else if (t.hasClass("rotate-1")) {
                        var l = t.find(".rivax-fancy-text-item"),
                            r = 0,
                            d = 0;
                        l.each(function () {
                            (d = e(this).width()) > r && (r = d);
                        });

                        t.find(".rivax-fancy-text-list").css("min-width", r);
                    }

                    setTimeout(function () {
                        hideWord(t.find(".is-visible").eq(0));
                    }, o);

                });
            }

            function hideWord($word) {
                var nextWord = takeNext($word);

                if(!$word.parents(".rivax-fancy-text").hasClass("clip") && !$word.parents(".rivax-fancy-text").hasClass("type")) {
                    $word.parent(".rivax-fancy-text-list").css('width', nextWord.width());
                }

                if ($word.parents(".rivax-fancy-text").hasClass("type")) {

                    var parentFancy = $word.parent(".rivax-fancy-text-list");
                    parentFancy.addClass("selected").removeClass("waiting");
                    setTimeout(function () {
                        parentFancy.removeClass("selected");
                        $word.removeClass("is-visible").addClass("is-hidden").children("i").removeClass("in").addClass("out");
                    }, r);
                    setTimeout(function () {
                        showWord(nextWord, l);
                    }, d);
                }
                else if ($word.parents(".rivax-fancy-text").hasClass("letters")) {

                    var p = $word.children("i").length >= nextWord.children("i").length;
                    switchWord($word, nextWord);
                    hideLetter($word.find("i").eq(0), $word, p, o);
                    showLetter(nextWord.find("i").eq(0), nextWord, p, o);
                }
                else if( $word.parents(".rivax-fancy-text").hasClass("clip") ) {

                    $word.parents(".rivax-fancy-text-list").animate({ width: "2px" }, c, function () {
                        switchWord($word, nextWord);
                        showWord(nextWord);
                    });
                }
                else if( $word.parents(".rivax-fancy-text").hasClass("bar-loading") ) {

                    $word.parents(".rivax-fancy-text-list").removeClass("is-loading");
                    switchWord($word, nextWord);
                    setTimeout(function () {
                        hideWord(nextWord);
                    }, a);
                    setTimeout(function () {
                        $word.parents(".rivax-fancy-text-list").addClass("is-loading");
                    }, s);
                }
                else {

                    switchWord($word, nextWord);
                    setTimeout(function () {
                        hideWord(nextWord);
                    }, n);
                }
            }

            function showWord($word, $duration) {

                if( $word.parents(".rivax-fancy-text").hasClass("type") ) {

                    showLetter($word.find("i").eq(0), $word, false, $duration);
                    $word.addClass("is-visible").removeClass("is-hidden");
                }
                else if( $word.parents(".rivax-fancy-text").hasClass("clip") ) {

                    $word.parents(".rivax-fancy-text-list").animate({ width: $word.outerWidth() + 0 }, c, function () {
                        setTimeout(function () {
                            hideWord($word);
                        }, p);
                    });
                }
            }

            function hideLetter($letter, $word, $bool, $duration) {

                $letter.removeClass("in").addClass("out");
                if( $letter.is(":last-child") ) {

                    $bool &&
                    setTimeout(function () {
                        hideWord(takeNext($word));
                    }, n);
                }
                else {

                    setTimeout(function () {
                        hideLetter($letter.next(), $word, $bool, $duration);
                    }, $duration);
                }
            }

            function showLetter($letter, $word, $bool, $duration) {

                $letter.addClass("in").removeClass("out");
                if( $letter.is(":last-child") ) {

                    if ( $word.parents(".rivax-fancy-text").hasClass("type") ) {
                        setTimeout(function () {
                            $word.parents(".rivax-fancy-text-list").addClass("waiting");
                        }, 200);
                    }

                    if (!$bool) {
                        setTimeout(function () {
                            hideWord($word);
                        }, n);
                    }
                }
                else {
                    setTimeout(function () {
                        showLetter($letter.next(), $word, $bool, $duration);
                    }, $duration);
                }
            }

            function takeNext($word) {
                return $word.is(":last-child") ? $word.parent().children().eq(0) : $word.next();
            }

            function switchWord($oldWord, $newWord) {
                $oldWord.removeClass("is-visible").addClass("is-hidden");
                $newWord.removeClass("is-hidden").addClass("is-visible");
            }

            animateFancyText();
        },
    };
    e(window).on("elementor/frontend/init", i.init);
})(jQuery, window.elementorFrontend);
