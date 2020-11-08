# An interactive version of darobin/quasi

A Vue 3 adaptation of an old JS port of C algorythm for generating various quasicrystallic structures and rendering them to SVG. Added some controls to manipulate the result and a function of downloading the final SVG.

------

https://github.com/darobin/quasi - original repo


## quasi-svg — SVG quasicrystals in JS


This is a port of Eric Weeks' `quasi.c`, which can still be found all the way back in 1995:
http://www.physics.emory.edu/faculty/weeks/software/quasic.html.

I made a few modifications, including supporting SVG output in addition to PostScript, but overall
the heart of the generator is a straight port. As such, it has a certain amount of undocumented
magic (it also looks a lot more like C than the usual JS).

Call `Quasi.svg()` with some options.

## API

* `svg([options])`. Takes some options and generates an SVG string. 
  with the following keys, all optional:
  * `size` (Number). A scaling factor.
  * `fillPolygons` (Boolean). Fills the polygons.
  * `fillColor` (Boolean). Fill colour is according to polygon type (also sets `fillPolygons`).
  * `rotate` (Boolean). Flip 90°.
  * `magnify` (Number). Magnification factor.
  * `skinnyMidpoint` (Enum) Midpoint type for skinny diamonds, takes enumerated values below.
  * `fatMidpoint` (Enum) Midpoint type for fat diamonds, takes enumerated values below.
    * `1`: acute angle sides joined
    * `2`: obtuse angle sides joined
    * `3`: opposite sides joined to make cross
    * `4`: all sides joined to make rectangle
    * `5`: randomly choose 1 or 2
    * `6`: randomly choose 1, 2, or 4
  * `symmetry` (Int). Degrees of symmetry.
  * `lines` (Int). Number of lines to use.
  * `strokeWidth` (Number). The stroke width for drawing.
  * `color` (Boolean). To be used with `fillColor`, if set will generate pretty-looking colours for
    the fills.
* `quasi(options, writer)`. This is the core engine that generates the quasicrystals. It takes the
  same options as the other two plus a `writer`. The writer is basically an object that quasi 
  controls in order to tell it to produce the output. Look at the source of the `svg` and `ps`
  modules for details.
