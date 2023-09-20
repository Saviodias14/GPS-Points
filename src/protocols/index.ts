
export type Location = {
    device_id: string,
    date?: number,
    direction?: number,
    distance?: number,
    time?: number,
    valuesComposition?: string[],
    speed?: number,
    latitude?: number,
    longitude?: number
}

export type DataInMemory = {
    email: string;
    password: string;
    device_id: string;
    message?: string[]
}[]

export type ApplicationError = {
    name: string;
    message: string;
    status: number
  };