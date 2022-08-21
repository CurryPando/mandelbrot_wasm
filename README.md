# mandelbrot_wasm
Mandelbrot simulating using rust compiled to web assembly

# How to run this code
If for some reason you want to run this
  1. download the files into a zip
  2. unpack the files
  3. in your terminal `cd` into the folder that contains the 'index.html' file
  4. run `python3 -m http.server` or some other hosting method
  5. go the link that the command returns in your browser
  
# Potential Error
If it doesn't work, try changing the name of `mandelbrot.js` to `mandelbrot.mjs` and changing line 9 in `index.html` to `<script type="module" src="mandelbrot.mjs"></script>`
  
 # Modifying this
 You can change the iterations in the javascript file outside of the pkg folder, and you can change the resolution in the canvas element in the html file.
