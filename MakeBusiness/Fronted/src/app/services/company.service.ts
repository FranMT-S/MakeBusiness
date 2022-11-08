import { Injectable } from '@angular/core';
import { Company } from '../interfaces/company';
import { fileCompany } from '../interfaces/fileCompany';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() { }

  private currentCompany:Company = {} as Company;
  private currentProducts:Product[] = [];
  private currentFiles:fileCompany[] = [];

  get getAllCompany():Company[]{
    return [...Data]
  }

  get getCompany():Company{
    return this.currentCompany;
  }

  get getCurrentProducts():Product[]{
    return [...this.currentProducts];
  }

  get getCurrentFiles():fileCompany[]{
    return [...this.currentFiles];
  }

  set setCurrentCompany(company:Company){
     this.currentCompany = company;
  }

  getCompanyById(id:string):Company{
    let company = Data.find( e => e.id == id )
    if(company == null)
      throw new Error("el servicio no pudo encontrar la compania con el id: " + id)
  
    return company;
    
  }

  getCompanyByUser(idUser:string):Company | undefined{
    return Data.find( e => e.idUser == idUser );
  }

  changeStateCompany(id:string):boolean{
    let company = Data.find( e => e.id == id );
    
    if(company != undefined){
      company.state = !company.state;
      return true;
    }

    return false;
  }

  getCompanyProducts(idCompany:string):Product[]{
     let products:Product[] = [];

     products = productsData.filter(e => e.idCompany == idCompany);
     this.currentProducts = products;

     return products;
  }

  getCompanyFiles(idCompany:string):fileCompany[]{
    let files:fileCompany[] = [];

    files = filesData.filter(e => e.idCompany == idCompany);
    this.currentFiles = files;

    return files;
 }

  getProductById(idProduct:string):Product{

    let product:Product | undefined = {} as Product;

    if(this.currentCompany == undefined || this.currentCompany == null) 
        throw new Error("No se ha establecido la compania actual");   
    

    // Si el arreglo no se ha llenado traer los productos de la compania actual y luego el producto
    let products:Product[] = this.getCompanyProducts(this.currentCompany.id);
    product = products.find(e => e.id == idProduct);
    
    if(product == undefined) throw new Error("--No se encontre el producto con id: " + idProduct)

    return product;
 }
}

const Data:Company[] =[{
  "id": '1',
  "nameCompany": "Olenolin",
  "description": "Empresa de sombreros",
  "phone": "161-430-5930",
  "category": "Health Care",
  "location": "2 Crownhardt Plaza",
  "state": true,
  "idPlan": "3",
  "idWeb": '2',
  "idUser": '8'
}, {
  "id": '2',
  "nameCompany": "Lily",
  "phone": "997-109-8572",
  "description": "Empresa de tecnologia",
  "category": "Tecnology",
  "location": "53 Sutherland Trail",
  "state": true,
  "idPlan": "3",
  "idWeb": '2',
  "idUser": '9'
}, {
  "id": '3',
  "nameCompany": "Evey",
  "phone": "968-276-4037",
  "description": "Empresa de tecnologia",
  "category": "Technology",
  "location": "27 Portage Street",
  "state": true  ,
  "idPlan": "3",
  "idWeb": '3',
  "idUser": '10'
}]


/////////////////////////////////////////
const filesData:fileCompany[] = [
  {
    id: "1",
    name: "01.png",
    description: "imagen 1",
    idCompany: "2"
  },
  {
    id: "2",
    name: "02.jpg",
    description: "imagen 2",
    idCompany: "2"
  },
  {
    id: "3",
    name: "03.mp4",
    description: "video 1",
    idCompany: "2"
  },
  {
    id: "4",
    name: "04.pdf",
    description: "documento 1",
    idCompany: "2"
  },
  {
    id: "5",
    name: "05.docx",
    description: "documento 2",
    idCompany: "2"
  }
]

/////////////////////////////////////

const productsData:Product[] = [{
  "id": '1',
  "name": "Corn Meal",
  "price": 896,
  "description": "turpis elementum ligula vehicula consequat morbi a ipsum integer a",
  "score": 45,
  "counterVotes": 10,
  "image": "",
  "categories": "food",
  "idCompany": '1'
}, {
  "id": '2',
  "name": "V8 Pet",
  "price": 146,
  "description": "etiam faucibus cursus urna ut tellus nulla ut erat id mauris",
  "score": 41,
  "counterVotes": 9,
  "image": "",
  "categories": "food",
  "idCompany": '2'
}, {
  "id": '3',
  "name": "Cake Circle, Paprus",
  "price": 310,
  "description": "posuere metus vitae ipsum aliquam non mauris morbi non lectus aliquam sit amet diam",
  "score": 23,
  "counterVotes": 5,
  "image": "",
  "categories": "food",
  "idCompany": '2'
}, {
  "id": '4',
  "name": "Potatoes - Fingerling 4 Oz",
  "price": 743,
  "description": "ac consequat metus sapien ut nunc vestibulum ante ipsum primis",
  "score": 1,
  "counterVotes": 0,
  "image": "",
  "categories": "food",
  "idCompany": '2'
}, {
  "id": '5',
  "name": "Nescafe - Frothy French Vanilla",
  "price": 336,
  "description": "non quam nec dui luctus rutrum nulla tellus in sagittis dui vel nisl duis ac",
  "score": 44,
  "counterVotes": 9,
  "image": "",
  "categories": "food",
  "idCompany": '2'
}, {
  "id": '6',
  "name": "Bread Foccacia Whole",
  "price": 333,
  "description": "eget nunc donec quis orci eget orci vehicula condimentum curabitur in libero ut massa volutpat",
  "score": 11,
  "counterVotes": 3,
  "image": "",
  "categories": "food",
  "idCompany": '2'
}, {
  "id": '7',
  "name": "Cheese - Comtomme",
  "price": 856,
  "description": "mauris non ligula pellentesque ultrices phasellus id sapien in sapien iaculis",
  "score": 11,
  "counterVotes": 3,
  "image": "",
  "categories": "food",
  "idCompany": '3'
}, {
  "id": '8',
  "name": "Rum - Dark, Bacardi, Black",
  "price": 259,
  "description": "nulla quisque arcu libero rutrum ac lobortis vel dapibus at",
  "score": 13,
  "counterVotes": 3,
  "image": "",
  "categories": "food",
  "idCompany": '1'
}, {
  "id": '9',
  "name": "Wine - Pinot Noir Pond Haddock",
  "price": 201,
  "description": "enim blandit mi in porttitor pede justo eu massa donec dapibus",
  "score": 43,
  "counterVotes": 9,
  "image": "",
  "categories": "food",
  "idCompany": '1'
}, {
  "id": '10',
  "name": "Yogurt - Strawberry, 175 Gr",
  "price": 796,
  "description": "massa donec dapibus duis at velit eu est congue elementum in hac habitasse",
  "score": 32,
  "counterVotes": 7,
  "image": "",
  "categories": "food",
  "idCompany": '1'
}, {
  "id": '11',
  "name": "Wine - Kwv Chenin Blanc South",
  "price": 169,
  "description": "vitae mattis nibh ligula nec sem duis aliquam convallis nunc proin at",
  "score": 18,
  "counterVotes": 4,
  "image": "",
  "categories": "food",
  "idCompany": '3'
}, {
  "id": '12',
  "name": "Yoplait Drink",
  "price": 767,
  "description": "dui vel sem sed sagittis nam congue risus semper porta volutpat quam pede lobortis",
  "score": 32,
  "counterVotes": 7,
  "image": "",
  "categories": "food",
  "idCompany": '3'
}, {
  "id": '13',
  "name": "Chutney Sauce",
  "price": 178,
  "description": "felis eu sapien cursus vestibulum proin eu mi nulla ac enim",
  "score": 7,
  "counterVotes": 2,
  "image": "",
  "categories": "food",
  "idCompany": '3'
}, {
  "id": '14',
  "name": "Wine - Duboeuf Beaujolais",
  "price": 415,
  "description": "et tempus semper est quam pharetra magna ac consequat metus",
  "score": 45,
  "counterVotes": 10,
  "image": "",
  "categories": "food",
  "idCompany": '1'
}, {
  "id": '15',
  "name": "Contreau",
  "price": 500,
  "description": "justo in hac habitasse platea dictumst etiam faucibus cursus urna ut tellus nulla ut erat",
  "score": 8,
  "counterVotes": 2,
  "image": "",
  "categories": "food",
  "idCompany": '2'
}, {
  "id": '16',
  "name": "Temperature Recording Station",
  "price": 246,
  "description": "nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus vel nulla eget eros elementum",
  "score": 16,
  "counterVotes": 4,
  "image": "",
  "categories": "food",
  "idCompany": '2'
}, {
  "id": '17',
  "name": "Soup - Knorr, Country Bean",
  "price": 268,
  "description": "eleifend donec ut dolor morbi vel lectus in quam fringilla",
  "score": 24,
  "counterVotes": 5,
  "image": "",
  "categories": "food",
  "idCompany": '2'
}, {
  "id": '18',
  "name": "Wine - Blue Nun Qualitatswein",
  "price": 339,
  "description": "tincidunt lacus at velit vivamus vel nulla eget eros elementum",
  "score": 13,
  "counterVotes": 3,
  "image": "",
  "categories": "food",
  "idCompany": '3'
}, {
  "id": '19',
  "name": "Asparagus - Frozen",
  "price": 935,
  "description": "sed nisl nunc rhoncus dui vel sem sed sagittis nam",
  "score": 35,
  "counterVotes": 8,
  "image": "",
  "categories": "food",
  "idCompany": '3'
}, {
  "id": '20',
  "name": "Radish",
  "price": 491,
  "description": "risus praesent lectus vestibulum quam sapien varius ut blandit non interdum in ante vestibulum ante",
  "score": 2,
  "counterVotes": 0,
  "image": "",
  "categories": "food",
  "idCompany": '1'
}, {
  "id": '21',
  "name": "Buffalo - Short Rib Fresh",
  "price": 403,
  "description": "ultrices aliquet maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede",
  "score": 27,
  "counterVotes": 6,
  "image": "",
  "categories": "food",
  "idCompany": '1'
}, {
  "id": '22',
  "name": "Pork - Loin, Boneless",
  "price": 568,
  "description": "accumsan odio curabitur convallis duis consequat dui nec nisi volutpat eleifend",
  "score": 11,
  "counterVotes": 3,
  "image": "",
  "categories": "food",
  "idCompany": '2'
}, {
  "id": '23',
  "name": "Snapple Raspberry Tea",
  "price": 448,
  "description": "sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus",
  "score": 4,
  "counterVotes": 0,
  "image": "",
  "categories": "food",
  "idCompany": '1'
}, {
  "id": '24',
  "name": "Water - Spring Water 500ml",
  "price": 1000,
  "description": "imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor",
  "score": 23,
  "counterVotes": 5,
  "image": "",
  "categories": "food",
  "idCompany": '2'
}, {
  "id": '25',
  "name": "Tea - Honey Green Tea",
  "price": 461,
  "description": "volutpat in congue etiam justo etiam pretium iaculis justo in hac",
  "score": 8,
  "counterVotes": 2,
  "image": "",
  "categories": "food",
  "idCompany": '3'
}, {
  "id": '26',
  "name": "Garlic",
  "price": 485,
  "description": "odio in hac habitasse platea dictumst maecenas ut massa quis augue luctus tincidunt nulla mollis",
  "score": 2,
  "counterVotes": 0,
  "image": "",
  "categories": "food",
  "idCompany": '3'
}, {
  "id": '27',
  "name": "Bread Ww Cluster",
  "price": 665,
  "description": "malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit",
  "score": 34,
  "counterVotes": 7,
  "image": "",
  "categories": "food",
  "idCompany": '1'
}, {
  "id": '28',
  "name": "Salt And Pepper Mix - White",
  "price": 155,
  "description": "vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit",
  "score": 4,
  "counterVotes": 0,
  "image": "",
  "categories": "food",
  "idCompany": '1'
}, {
  "id": '29',
  "name": "Turkey - Breast, Double",
  "price": 417,
  "description": "commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet",
  "score": 28,
  "counterVotes": 6,
  "image": "",
  "categories": "food",
  "idCompany": '3'
}, {
  "id": '30',
  "name": "Steel Wool",
  "price": 66,
  "description": "morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed",
  "score": 38,
  "counterVotes": 8,
  "image": "",
  "categories": "food",
  "idCompany": '3'
}, {
  "id": '31',
  "name": "Cheese Cheddar Processed",
  "price": 246,
  "description": "sapien quis libero nullam sit amet turpis elementum ligula vehicula",
  "score": 35,
  "counterVotes": 8,
  "image": "",
  "categories": "food",
  "idCompany": '3'
}, {
  "id": '32',
  "name": "The Pop Shoppe Pinapple",
  "price": 379,
  "description": "maecenas leo odio condimentum id luctus nec molestie sed justo pellentesque viverra pede ac",
  "score": 14,
  "counterVotes": 3,
  "image": "",
  "categories": "food",
  "idCompany": '3'
}, {
  "id": '33',
  "name": "Beans - Kidney, Canned",
  "price": 279,
  "description": "nec condimentum neque sapien placerat ante nulla justo aliquam quis turpis eget elit",
  "score": 50,
  "counterVotes": 11,
  "image": "",
  "categories": "food",
  "idCompany": '2'
}, {
  "id": '34',
  "name": "Sugar - Fine",
  "price": 385,
  "description": "ante vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae duis",
  "score": 23,
  "counterVotes": 5,
  "image": "",
  "categories": "food",
  "idCompany": '3'
}, {
  "id": '35',
  "name": "Pepper Squash",
  "price": 971,
  "description": "etiam pretium iaculis justo in hac habitasse platea dictumst etiam",
  "score": 21,
  "counterVotes": 5,
  "image": "",
  "categories": "food",
  "idCompany": '1'
}, {
  "id": '36',
  "name": "Bread - Multigrain",
  "price": 342,
  "description": "eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum",
  "score": 13,
  "counterVotes": 3,
  "image": "",
  "categories": "food",
  "idCompany": '1'
}, {
  "id": '37',
  "name": "Cocktail Napkin Blue",
  "price": 403,
  "description": "nulla pede ullamcorper augue a suscipit nulla elit ac nulla",
  "score": 47,
  "counterVotes": 10,
  "image": "",
  "categories": "food",
  "idCompany": '3'
}, {
  "id": '38',
  "name": "Creme De Menth - White",
  "price": 984,
  "description": "quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt ante vel ipsum praesent blandit",
  "score": 16,
  "counterVotes": 4,
  "image": "",
  "categories": "food",
  "idCompany": '2'
}, {
  "id": '39',
  "name": "Spice - Peppercorn Melange",
  "price": 85,
  "description": "ridiculus mus vivamus vestibulum sagittis sapien cum sociis natoque penatibus et magnis",
  "score": 30,
  "counterVotes": 7,
  "image": "",
  "categories": "food",
  "idCompany": '2'
}, {
  "id": '40',
  "name": "Bagelers",
  "price": 595,
  "description": "blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit",
  "score": 19,
  "counterVotes": 4,
  "image": "",
  "categories": "food",
  "idCompany": '1'
}, {
  "id": '41',
  "name": "Coconut - Shredded, Sweet",
  "price": 604,
  "description": "ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat praesent blandit nam",
  "score": 30,
  "counterVotes": 7,
  "image": "",
  "categories": "food",
  "idCompany": '1'
}, {
  "id": '42',
  "name": "Pie Filling - Cherry",
  "price": 306,
  "description": "elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est phasellus sit amet",
  "score": 43,
  "counterVotes": 9,
  "image": "",
  "categories": "food",
  "idCompany": '2'
}, {
  "id": '43',
  "name": "Wine - George Duboeuf Rose",
  "price": 397,
  "description": "odio elementum eu interdum eu tincidunt in leo maecenas pulvinar lobortis est",
  "score": 46,
  "counterVotes": 10,
  "image": "",
  "categories": "food",
  "idCompany": '1'
}, {
  "id": '44',
  "name": "Ice Cream - Chocolate",
  "price": 490,
  "description": "accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet",
  "score": 5,
  "counterVotes": 2,
  "image": "",
  "categories": "food",
  "idCompany": '2'
}, {
  "id": '45',
  "name": "Beef - Rib Eye Aaa",
  "price": 51,
  "description": "lobortis ligula sit amet eleifend pede libero quis orci nullam molestie",
  "score": 21,
  "counterVotes": 5,
  "image": "",
  "categories": "food",
  "idCompany": '2'
}, {
  "id": '46',
  "name": "Pasta - Cannelloni, Sheets, Fresh",
  "price": 616,
  "description": "arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus pellentesque eget nunc donec quis",
  "score": 30,
  "counterVotes": 7,
  "image": "",
  "categories": "food",
  "idCompany": '3'
}, {
  "id": '47',
  "name": "Yogurt - Strawberry, 175 Gr",
  "price": 876,
  "description": "enim lorem ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula",
  "score": 48,
  "counterVotes": 10,
  "image": "",
  "categories": "food",
  "idCompany": '3'
}, {
  "id": '48',
  "name": "Lamb - Leg, Bone In",
  "price": 341,
  "description": "cras in purus eu magna vulputate luctus cum sociis natoque penatibus et magnis",
  "score": 23,
  "counterVotes": 5,
  "image": "",
  "categories": "food",
  "idCompany": '2'
}, {
  "id": '49',
  "name": "Filo Dough",
  "price": 509,
  "description": "primis in faucibus orci luctus et ultrices posuere cubilia curae duis",
  "score": 8,
  "counterVotes": 2,
  "image": "",
  "categories": "food",
  "idCompany": '3'
}, {
  "id": '50',
  "name": "Tray - Foam, Square 4 - S",
  "price": 73,
  "description": "aliquet maecenas leo odio condimentum id luctus nec molestie sed justo",
  "score": 37,
  "counterVotes": 8,
  "image": "",
  "categories": "food",
  "idCompany": '1'
}]
