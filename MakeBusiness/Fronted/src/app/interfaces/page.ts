
export interface page{
    _id: string,
    title: string,
    description: string,
    js?:string,
    css?:string,
    blocks: Block[],

}

export interface pageCompany extends page{
    images?: string[]
    useGenericHeader: boolean,
    useGenericFooter: boolean,
    idWeb: string,
}

// TemplateRaw y pageCompany son las que se editaran
export interface TemplateRaw extends page{
    images: string[]
}

// Template solo para mostrar la informacion mas basica
export interface TemplateDescription {
    _id: string,
    title: string,
    description: string,
}


export interface Block{
    _id: string,
    size: number,
    HTML: string,
    position:number,
    type:'dynamic' | 'pure',
    editing?: boolean
}

