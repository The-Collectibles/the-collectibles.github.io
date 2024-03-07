import { IImagehelper } from "./IImagehelper";

export default class SideshowImageHelper implements IImagehelper {

    GetImageLink(thumbnail: string) {
        return thumbnail?.startsWith("http") ? thumbnail : `https://www.sideshow.com${thumbnail}`;
    }
}