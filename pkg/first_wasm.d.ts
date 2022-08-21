/* tslint:disable */
/* eslint-disable */
/**
* @param {number} sX
* @param {number} width
* @param {number} range_x
* @param {number} origin_x
* @returns {number}
*/
export function sX_to_cX(sX: number, width: number, range_x: number, origin_x: number): number;
/**
* @param {number} sY
* @param {number} height
* @param {number} range_y
* @param {number} origin_y
* @returns {number}
*/
export function sY_to_cY(sY: number, height: number, range_y: number, origin_y: number): number;
/**
* @param {number} iterations
* @param {number} width
* @param {number} height
* @param {Int32Array} pixels
* @param {number} origin_x
* @param {number} origin_y
* @param {number} range_x
* @param {number} range_y
*/
export function generate_mandelbrot(iterations: number, width: number, height: number, pixels: Int32Array, origin_x: number, origin_y: number, range_x: number, range_y: number): void;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly sX_to_cX: (a: number, b: number, c: number, d: number) => number;
  readonly sY_to_cY: (a: number, b: number, c: number, d: number) => number;
  readonly generate_mandelbrot: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
}

/**
* Synchronously compiles the given `bytes` and instantiates the WebAssembly module.
*
* @param {BufferSource} bytes
*
* @returns {InitOutput}
*/
export function initSync(bytes: BufferSource): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
