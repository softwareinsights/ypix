import { ActivityInterface } from './../activity/activity.interface';

import { LocationInterface } from "./location.interface";

export interface PlaceInterface {
    id?: string;
    title: string,
    description: string;
    location: LocationInterface;
    imageUrl: string;
    actividads?: ActivityInterface[];
}
