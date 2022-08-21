
let wasm;

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

let cachedUint32Memory0 = new Uint32Array();

function getUint32Memory0() {
    if (cachedUint32Memory0.byteLength === 0) {
        cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32Memory0;
}

let WASM_VECTOR_LEN = 0;

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4);
    getUint32Memory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachedInt32Memory0 = new Int32Array();

function getInt32Memory0() {
    if (cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}
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
export function generate_mandelbrot(iterations, width, height, pixels, origin_x, origin_y, range_x, range_y) {
    try {
        var ptr0 = passArray32ToWasm0(pixels, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.generate_mandelbrot(iterations, width, height, ptr0, len0, origin_x, origin_y, range_x, range_y);
    } finally {
        pixels.set(getInt32Memory0().subarray(ptr0 / 4, ptr0 / 4 + len0));
        wasm.__wbindgen_free(ptr0, len0 * 4);
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function getImports() {
    const imports = {};
    imports.wbg = {};

    return imports;
}

function initMemory(imports, maybe_memory) {

}

function finalizeInit(instance, module) {
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = new Int32Array();
    cachedUint32Memory0 = new Uint32Array();


    return wasm;
}

function initSync(bytes) {
    const imports = getImports();

    initMemory(imports);

    const module = new WebAssembly.Module(bytes);
    const instance = new WebAssembly.Instance(module, imports);

    return finalizeInit(instance, module);
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('first_wasm_bg.wasm', import.meta.url);
    }
    const imports = getImports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    initMemory(imports);

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
}

export { initSync }
export default init;
