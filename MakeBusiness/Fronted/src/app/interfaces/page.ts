export interface TemplateDescription {
    id: string,
    title: String,
    description: String,
}

export interface TemplateRaw{
    id: string,
    title: String,
    description: String,
    js:String,
    Blocks: Block[]
    images: string[]
}

export interface Block{
    id: string,
    size: number,
    HTML: String,
    CSS:String,
    position:number,
    type:String,
}

