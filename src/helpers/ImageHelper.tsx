export default class ImageHelper {

    GetImageLink(thumbnail: string) {
        return thumbnail.startsWith("http") ? thumbnail : `https://www.sideshow.com${thumbnail}`;
    }
}