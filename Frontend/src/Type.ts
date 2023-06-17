export interface animal{
    id?: string,
    name: string,
    ownerId: string,
    doctorId: string,
    doctor?: doctor,
    owner?: owner,
    animalServices?: animalService[],
    animalVaccines?: animalVaccine[]
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

export interface animalService{
    id?: string,
    animalsId?: string,
    servicesId?: string,
    date?: Date
}
export interface animalVaccine{
    id?: string,
    animalsId?: string,
    vaccinesId?: string,
    date?: Date
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

export interface arrayVaccineAndService{
    services: service[],
    vaccines: vaccine[]
}
//#endregion