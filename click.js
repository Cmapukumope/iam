'use strict'

function kodimg(_this) {
    switch ("promo-slider-down-1s") {
        case document.getElementById("cliker1").className:
            document.getElementById("cliker1").className = 'promo-slider-down-1s1';
            document.getElementById("cliker2").className = 'promo-slider-down-1s';
            break;

        case document.getElementById("cliker2").className:
            document.getElementById("cliker2").className = 'promo-slider-down-1s1';
            document.getElementById("cliker3").className = 'promo-slider-down-1s';
            break;

        case document.getElementById("cliker3").className:
            document.getElementById("cliker3").className = 'promo-slider-down-1s1';
            document.getElementById("cliker1").className = 'promo-slider-down-1s';
            break;
    }
}