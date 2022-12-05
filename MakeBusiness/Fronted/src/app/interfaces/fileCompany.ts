export interface fileCompany {
    _id: string,
    baseName:string,
    name: string;
    fileName:string
    description: string;
    idCompany: string;
}


export interface fileSend {
    file:File;
    baseName?:String;
    description: string;
}
