export function convertDegreeCtoF(degree) {
    return degree * 9 / 5 + 32;
}

export function convertDegreeFtoC(degree) {
    return degree - 32 * 5 / 9;
}

export function convertWindDegree(degree) {
    if (degree <= 10 || degree >= 350) return 'common.wind.north';
    if (degree > 10 && degree < 45) return 'common.wind.northEast';
    if (degree >= 315 && degree < 350) return 'common.wind.northWest';

    if (degree >= 80 && degree <= 100) return 'common.wind.east';
    if (degree >= 45 && degree < 80) return 'common.wind.eastNorth';
    if (degree > 100 && degree < 135) return 'common.wind.eastSouth';

    if (degree >= 170 && degree <= 190) return 'common.wind.south';
    if (degree >= 135 && degree < 170) return 'common.wind.southEast';
    if (degree > 190 && degree < 225) return 'common.wind.southWest';

    if (degree >= 260 && degree < -280) return 'common.wind.west';
    if (degree >= 225 && degree < 260) return 'common.wind.westSouth';
    if (degree > 280 && degree < 315) return 'common.wind.westNorth';
}
