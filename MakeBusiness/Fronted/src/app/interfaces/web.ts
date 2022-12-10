import * as internal from "stream"
import { page, pageCompany } from "./page";


export interface webCompany {
    _id: string,
    pageMain: String,
    logo?: String,
    favicon?: string,
    title: String,
    description?: String,
    keywords?: string,
    cssExtra?: string,
    jsExtra?: string,
    genericHeaderHTML?: string,
    genericFooterHTML?: string,
}

export interface WebWithPage extends webCompany{
    pages:pageCompany[];
    
}