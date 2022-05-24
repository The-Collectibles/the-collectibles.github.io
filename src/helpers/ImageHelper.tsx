export default class ImageHelper {

    GetImageLink(thumbnail: string) {
        return thumbnail.startsWith("https") ? thumbnail : `https://www.sideshow.com${thumbnail}`;
    }
}