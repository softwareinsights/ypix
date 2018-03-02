import { ActivityInterface } from './../activity/activity.interface';
import { LocationInterface } from "./location.interface";

export interface PlaceInterface {
    id?: string;
    title: string,
    description: string;
    location: LocationInterface;
    imageUrl: string;
    activities?: ActivityInterface[];
    public?: boolean;
    cost?: number;
    direccion?: string;
    horarios?: string;
}
