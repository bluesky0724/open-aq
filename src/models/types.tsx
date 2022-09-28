export interface Country {
    code : String;
    name : String;
    locations : number;
    firstUpdated : Date;
    lastUpdated: Date;
    parameters: Array<String>;
    count: number
}

export interface City {
    country : string;
    city : string;
    count : number;
    locations : number;
    firstUpdated : Date;
    lastUpdated : Date;
    parameters: Array<String>;
}

export interface MeasurementInfo {
    parameter : string;
    value: number;
    lastUpdated: Date;
    unit : string;
}

export interface Measurement {
    location: string;
    city: string;
    country: string;
    coordinates: {latitude: number, longitude: number};
    measurements: Array<MeasurementInfo>;
}

export interface Parameter {
    id: number;
    name: string;
    displayName: string;
    description: string;
    preferredUnit: string;
    isCore: boolean;
    maxColorValue: number;
}