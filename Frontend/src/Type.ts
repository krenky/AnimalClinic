export interface animal{
    id?: string,
    name: string,
    ownerId: string,
    doctorId: string,
    doctor?: doctor,
    owner?: owner
}

export interface doctor{
    id?: string,
    firstName: string,
    lastName: string,
    animals?: animal[]
}

export interface owner{
    id?: string,
    firstName: string,
    lastName: string,
    animals?: animal[]
}

export interface service{
    id?: string,
    name: string,
    price: string
}

export interface vaccine{
    id?: string,
    name: string,
    price: string
}

export type option<T> = {
    value: T,
    label: string
}

//#region DTO
export interface arrayOwnerAndDoctor{
    owners: owner[],
    doctors: doctor[]
}
//#endregion