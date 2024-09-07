<script lang='ts'>
    import type { Image } from '$lib/index';
    export let image: Image;
    export let imgStyle: string = "";
    export let captionStlye: string = "";
    export let divStyle: string = "";
</script>

<div class="text-sm absolute {divStyle} {image.class}" style={image.css}>
    <img src={image.imgURL} alt={image.alt} class="ml-2 {imgStyle}">
    <label for="caption" class=" {captionStlye}">{image.caption}</label>
</div>