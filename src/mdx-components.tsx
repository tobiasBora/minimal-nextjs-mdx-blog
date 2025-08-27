import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
 
const components: MDXComponents = {
  // - Method 1:
  //   Recommended approach in doc, but does not support <img src="./cat.jpg" width="40px"/>
  //   (but <img src="./cat.jpg" style="width:40px"/> works) because Image also reads width
  //   from src.width and it seems to take priority over width.
  //img: Image,

  img(props) {
    // - Method 2:
    //   Works for both width= and style=, but does not benefit from Image optimizations
    //   Note that setting both width and height does not produce a distorded result because tailwind
    //   sets the CSS to "width:auto" to images by default, taking priority over the html width,
    //   while the next solution will overwrite the width when present, hence taking priority over tailwind
    // return <img {...props} src={props.src.src} />
    // - Method 3:
    //   a bit more complex, but works also with Images (optimized, at least for non-static websites), but I'm not
    //   sure that pushing the width="XX" option in the style in the best solution (maybe better to put it
    //   in src.width?)
    const style = props.style || {};
    const width_style = props.width ? {width: props.width} : {} ;
    const height_style = props.width ? {height: props.height} : {} ;
    return <Image {...props} style={{...width_style, ...height_style, ...style}} alt={props.alt || ""} />
    // - Method 4 (fail):
    //   Changing the src.width does NOT work for a bit obscure reason: it also changes the width of other
    //   identical images (is the src.width cached globally somehow?).
    /* const px_str_to_int = (px_str : string) => parseInt(px_str.replace("px", ""));
     * if (props.width !== undefined && props.height !== undefined) {
     *   console.log("A");
     *   props.src.width = px_str_to_int(props.width);
     *   props.src.height = px_str_to_int(props.height);
     * }
     * else if (props.height !== undefined) {
     *   const h = px_str_to_int(props.height);
     *   const ratio = props.src.width / props.src.height;
     *   props.src.height = h;
     *   props.src.width = h * ratio ;
     * }
     * else if (props.width !== undefined) {
     *   const w = px_str_to_int(props.width);
     *   const ratio = props.src.width / props.src.height;
     *   props.src.width = w;
     *   props.src.height = w / ratio ;
     * }
     * // Alt is mandatory
     * return <Image {...props} alt={props.alt || ""} /> */
  },
}

export function useMDXComponents(): MDXComponents {
  return components
}
