(function($) {
    // Copies selective styles (second parameter) from source (first parameter) 
    $.fn.copySelectiveCSS = function(source, properties) {
        if (source && properties) {
            that = $(this);

            properties.forEach(function(property) {
                that.css(property, source.css(property));
            });
        }
    }
})(jQuery);

(function($) {
    // This method stetches text on the basis of its element width
    // Stretching means manipulating two properties: font-size and letter-spacing
    $.fn.stretch_text = function() {
        // First, we will set the font-size

        baseElement = $(this);

        // Resetting base element's letter spacing
        baseElement.css('letter-spacing', 0);

        // Base element's total Width
        baseElementWidth = $(this).width();

        text = $(this).html().trim();

        // New element
        newElement = $('<span style="font-size: 10px">' + text + '</span>');

        // Setting new element in DOM in order to get a width
        $(this).html(newElement);

        newElementWidth = newElement.width();

        // Calculating and setting required font size
        baseElementFontSize = 10 / newElementWidth * baseElementWidth;

        baseElement.html(text);
        baseElement.css('font-size', Math.floor(baseElementFontSize) + 'px');

        // Till here, the font is being set.
        // Now we will set the letter-spacing.

        newElement = $('<span>' + text + '</span>');
        newElement.css('font-size', Math.floor(baseElementFontSize) + 'px');
        $(this).parent().append(newElement);

        numberOfCharacters = newElement.html().trim().length;
        newElement.copySelectiveCSS($(this), ["font-family", "text-transform", "font-weight"]);

        baseLetterSpacing = (baseElementWidth - newElement.width()) / numberOfCharacters;
        newElement.remove();

        baseElement.css('letter-spacing', baseLetterSpacing);

        // Till here, the letter-spacing is set.
    };
})(jQuery);

$(document).ready(function() {
    $('.content-text').stretch_text();
    $('.content-heading').stretch_text();

    $(window).resize(function() {
        $('.content-text').stretch_text();
        $('.content-heading').stretch_text();
    });
})