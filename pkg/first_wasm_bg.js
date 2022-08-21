import * as wasm from './first_wasm_bg.wasm';

/**
* @param {number} sX
* @param {number} width
* @param {number} range_x
* @param {number} origin_x
* @returns {number}
*/
export function sX_to_cX(sX, width, range_x, origin_x) {
    const ret = wasm.sX_to_cX(sX, width, range_x, origin_x);
    return ret;
}

/**
* @param {number} sY
* @param {number} height
* @param {number} range_y
* @param {number} origin_y
* @returns {number}
*/
export function sY_to_cY(sY, height, range_y, origin_y) {
    const ret = wasm.sY_to_cY(sY, height, range_y, origin_y);
    return ret;
}

/**
* @param {number} iterations
* @param {number} origin_x
* @param {number} origin_y
* @param {number} range_x
* @param {number} range_y
* @returns {number}
*/
export function generate_mandelbrot(iterations, origin_x, origin_y, range_x, range_y) {
    const ret = wasm.generate_mandelbrot(iterations, origin_x, origin_y, range_x, range_y);
    return ret >>> 0;
}

