import init, {generate_mandelbrot, sX_to_cX, sY_to_cY} from './pkg/first_wasm.js'

let mand_canvas = document.getElementById("mandelbrot_canvas");
let mand_context = mand_canvas.getContext("2d");
let width = mand_canvas.getAttribute("width");
let height = mand_canvas.getAttribute("height");
let mand_image = mand_context.createImageData(width, height);
let pixels = mand_image.data;

for(let i = 0; i < pixels.length; i += 4) {
    [pixels[i+0], pixels[i+1], pixels[i+2], pixels[i+3]] = [255, 0, 0, 255];
}

mand_context.putImageData(mand_image, 10, 10);

const ITER = 1000;
let origin_x = 0.0;
let origin_y = 0.0;
let range_x = 2.0;
let range_y = range_x * (height/width);


await init()
    .then(() => {
        const genMandel = function() {
            generate_mandelbrot(ITER, width, height, pixels, origin_x, origin_y, range_x, range_y);
            mand_context.putImageData(mand_image, 10, 10);
        }
        
        genMandel();
        
        mand_canvas.onmousedown = function(event) {
            let p_mouse_x = event.pageX;
            let p_mouse_y = event.pageY;
            function onMouseMove(event) {
                origin_x += (p_mouse_x - event.pageX) * range_x/width * 2;
                origin_y += (event.pageY - p_mouse_y) * range_y/height * 2;
                genMandel();
                p_mouse_x = event.pageX;
                p_mouse_y = event.pageY;
            }
        
            document.addEventListener('mousemove', onMouseMove);
        
            document.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                document.onmouseup = null;
            }
        }
        
        mand_canvas.addEventListener('wheel', function(event) {
            let old_x = sX_to_cX(event.pageX, width, range_x, origin_x);
            let old_y = sY_to_cY(event.pageY, height, range_y, origin_y);
        
            range_x += Math.cbrt(event.deltaY/10) * range_x/5;
            range_y = range_x * (height/width);
        
            origin_x += old_x - sX_to_cX(event.pageX, width, range_x, origin_x);
            origin_y += old_y - sY_to_cY(event.pageY, height, range_y, origin_y);
        
            genMandel();
        
            return false;
        }, false);
    });