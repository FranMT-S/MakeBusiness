
import { Injectable } from '@angular/core';
import { TemplateDescription, TemplateRaw } from '../interfaces/page';


const Data:TemplateDescription[] = [
  {
    "id": "1",
    "title": "Miran",
    "description": "ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis"
  }, {
    "id": "2",
    "title": "Merle",
    "description": "ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis"
  }, {
    "id": "3",
    "title": "Merla",
    "description": "ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis"
  }, {
    "id": "4",
    "title": "Belvia",
    "description": "ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis"
  }, {
    "id": "5",
    "title": "Mufi",
    "description": "ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis"
  }, {
    "id": "6",
    "title": "Rodolphe",
    "description": "ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis"
  }, {
    "id": "7",
    "title": "Jonathan",
    "description": "ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis"
  }, {
    "id": "8",
    "title": "Grove",
    "description": "ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis"
  }, {
    "id": "9",
    "title": "Pall",
    "description": "ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis"
  }, {
    "id": "10",
    "title": "Adora",
    "description": "ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis"
  }
] 

const DataRaw:TemplateRaw[] = [ {
  "id": "1",
  "title": "Miran",
  "description": "ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis",
  "js": "saludo(){ console.log('hola')}",
  "blocks": [
    {
      "id":"1",
      "size":12,
      "HTML":"",
      "CSS":"background",
      "position":1,
      "type":"dynamic",
    },
    {
      "id":"2",
      "size":6,
      "HTML":"",
      "CSS":"background",
      "position":1,
      "type":"pure",
    },
    {
      "id":"3",
      "size":6,
      "HTML":"",
      "CSS":"background",
      "position":1,
      "type":"pure",
    },
],
  "images": [],
}];

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor() { }

  get getAllTemplatesDescription():TemplateDescription[]{
    return [...Data]
  }

  getTemplateDescription(id:string):TemplateDescription | undefined{
    return Data.find( e => e.id == id );
  }

  getTemplate(id:string):TemplateRaw | undefined{
    return DataRaw.find( e => e.id == id );
  }
}
