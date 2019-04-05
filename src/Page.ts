import {HalProperty, HalResource} from "hal-rest-client";

export class Page extends HalResource {
    @HalProperty()
    public size!: number;

    @HalProperty()
    public totalElements!: number;

    @HalProperty()
    public totalPages!: number;

    @HalProperty()
    public number!: number;
}
