import {HalProperty, HalResource} from "hal-rest-client";
import {Page} from "./Page";

export class Thing extends HalResource {
    @HalProperty()
    public page!: Page;
}
