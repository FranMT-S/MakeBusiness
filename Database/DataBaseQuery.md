# Cadena de conexion Shell

mongosh "mongodb+srv://cluster0.cbi1h.mongodb.net/MakeBusiness" --apiVersion 1 --username admin --password admin

# Cadena Mongo Atlas

mongodb+srv://admin:admin@cluster0.cbi1h.mongodb.net/test
 
# Coleciones

## User

db.createCollection("User", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            title: "Validacion Usuario",
            required: [ "userName", "email" , "password", "type" ],
            properties: {
                userName: {
                    bsonType: "string",
                    description: "tipo string, requerido"
                },
                email: {
                    bsonType: "string",
                    description: "tipo string, requerido"
                },
                password: {
                     bsonType: "string",
                    description: "tipo string, requerido"
                },
                type: {
                    enum: [ "client", "admin", "company" ],
                    description: "'type' debe ser client, admin o company y es obligatorio"
                },
                state: {
                    bsonType: [ "int" ],
                    description: "debe ser un tipo entero, cuando exista"
                }
            }      
        }
    }
} )

db.createCollection("Client", {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            title: 'Validacion Cliente',
            required: [
            'idUser'
            ],
            properties: {
                idUser: {
                    bsonType: 'objectId',
                    description: 'idUser (client)'
                },
                historical: {
                    bsonType: [
                    'array',
                    'null'
                    ],
                    description: 'arreglo de productos',
                    items: {
                        bsonType: 'object',
                        properties: {
                            idProduct: {
                                bsonType: 'objectId',
                                description: 'id Producto'
                            },
                            name: {
                                bsonType: 'string',
                                description: 'nombre producto'
                            },
                            price: {
                                bsonType: 'double',
                                description: 'precio producto'
                            },
                            quantity: {
                                bsonType: 'double',
                                description: 'cantidad producto'
                            },
                            total: {
                                bsonType: 'double',
                                description: 'total a pagar'
                            },
                            date: {
                                bsonType: 'date',
                                description: 'fecha de compra'
                            }
                        }
                    }
                }
            }
        }
    }
})

db.createCollection("Company",{
    validator:{
        $jsonSchema: {
            bsonType: 'object',
            title: 'Validacion Compania',
            required: [
            'nameCompany',
            'idPlan',
            'idUser'
            ],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'nombre de la compania'
                },
                description: {
                    bsonType: 'string',
                    description: 'descripcion de la empresa'
                },
                phone: {
                    bsonType: 'string',
                    description: 'telefono de la empresa'
                },
                category: {
                    bsonType: 'string',
                    description: 'categoria de la empresa'
                },
                state: {
                    bsonType: 'bool',
                    description: 'false o true, estado inactivo o activo de la empresa'
                },
                location: {
                    bsonType: 'string',
                    description: 'localizacion de la empresa'
                },
                idPlan: {
                    bsonType: 'objectId',
                    description: 'plan de compra'
                },
                idWeb: {
                    bsonType: 'objectId',
                    description: 'id de su web'
                },
                idUser: {
                    bsonType: 'objectId',
                    description: 'id del usuario de la compania'
                }
            }
        }
    }
})

db.createCollection("Plan",{
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            title: 'Validacion Plan',
            required: [
            'name',
            'price',
            'annuity',
            'limitPages',
            'limitFiles',
            'limitProducts'
            ],
            properties: {
            name: {
                bsonType: 'string',
                description: 'nombre que se usara para buscar el archivo'
            },
            description: {
                bsonType: 'string',
                description: 'descripcion del archivo'
            },
            price: {
                bsonType: 'double',
                description: 'precio'
            },
            annuity: {
                'enum': [
                'mensual',
                'anual',
                'semanal',
                'free'
                ],
                description: 'anualidad del precio'
            },
            limitPages: {
                bsonType: 'int',
                description: 'limite paginas'
            },
            limitFiles: {
                bsonType: 'int',
                description: 'limite archivos'
            },
            limitProducts: {
                bsonType: 'int',
                description: 'limite productos'
            }
            }
        }
        }
})

db.createCollection("Product",{
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            title: 'Validacion Producto',
            required: [
            'name',
            'price',
            'idCompany'
            ],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'nombre produto'
                },
                price: {
                    bsonType: 'double',
                    description: 'precio producto'
                },
                description: {
                    bsonType: 'string',
                    description: 'descripcion producto'
                },
                image: {
                    bsonType: 'string',
                    description: 'name (URL) del archivo'
                },
                categories: {
                    bsonType: 'string',
                    description: 'categorias separadas por comas'
                },
                idCompany: {
                    bsonType: 'objectId',
                    description: 'id de la compania'
                },
                votes: {
                    bsonType: [
                    'array',
                    'null'
                    ],
                    description: 'arreglo de usuarios id que botaron',
                    items: {
                        bsonType: 'object',
                        properties: {
                            idUser: {
                                bsonType: 'objectId',
                                description: 'id del usuario'
                            },
                            point: {
                                bsonType: 'int',
                                description: 'puntos valorados por el usuario'
                            }
                        }
                    }
                }
            }
        }
    }
})

db.createCollection("File",{
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            title: 'Validacion Archivos',
            required: [
                'idCompany'
            ],
            properties: {
                name: {
                    bsonType: 'string',
                    description: 'nombre que se usara para buscar el archivo'
                },
                description: {
                    bsonType: 'string',
                    description: 'descripcion del archivo'
                },
                idCompany: {
                    bsonType: 'objectId',
                    description: 'id de la empresa'
                },
            }
        }
    }
})

db.createCollection("Page",{
    validator: {
        $jsonSchema: {
            bsonType: "object",
            title: "Validacion Cliente",
            required: [ "idUser"],
            properties: {
                idUser: {
                    bsonType: "objectId",
                    description: "idUser (client)"
                },
                historical: {
                    bsonType: ["array", "null"],
                    description: "arreglo de objetos",
                    properties: {
                        idProduct:{
                        bsonType:"objectId",
                        description: "id Producto"
                        },
                        name:{
                        bsonType:"string",
                        description: "nombre producto"
                        },
                        price:{
                        bsonType:"double",
                        description: "precio producto"
                        },
                        quantity:{
                        bsonType:"double",
                        description: "cantidad producto"
                        },
                        total:{
                        bsonType:"double",
                        description: "total a pagar"
                        },
                        date:{
                        bsonType:"date",
                        description: "fecha de compra"
                        },
                    }
                }
        
            }      
        }
    }
})

db.createCollection("Web",{
    validator: {{
        $jsonSchema: {
            bsonType: 'object',
            title: 'Validacion Web',
            properties: {
                logo: {
                    bsonType: 'string',
                    description: 'name, url logo'
                },
                favicon: {
                    bsonType: 'string',
                    description: 'name, url favicon'
                },
                title: {
                    bsonType: 'string',
                    description: 'titulo de la pagina en la barra'
                },
                category: {
                    bsonType: 'string',
                    description: 'categoria de la empresa'
                },
                description: {
                    bsonType: 'string',
                    description: 'descripcion de la pagina'
                },
                keywords: {
                    bsonType: 'string',
                    description: 'palabras clave separadas por comas'
                },
                idPlan: {
                    bsonType: 'objectId',
                    description: 'plan de compra'
                },
                cssExtra: {
                    bsonType: 'string',
                    description: 'css extra'
                },
                jssExtra: {
                    bsonType: 'string',
                    description: 'javascript extra'
                },
                genericHeaderHTML: {
                    bsonType: 'string',
                    description: 'encabezado generico'
                },
                genericFooterHTML: {
                    bsonType: 'string',
                    description: 'pie de pagina generico'
                },
                pageMain: {
                    bsonType: 'objectId',
                    description: 'id de la pagina main'
                }
            }
        }
    }
})

db.createCollection("Template",{
    validator: {
        $jsonSchema: {
            bsonType: "object",
            title: "Validacion Cliente",
            required: [ "idUser"],
            properties: {
                idUser: {
                    bsonType: "objectId",
                    description: "idUser (client)"
                },
                historical: {
                    bsonType: ["array", "null"],
                    description: "arreglo de objetos",
                    properties: {
                        idProduct:{
                        bsonType:"objectId",
                        description: "id Producto"
                        },
                        name:{
                        bsonType:"string",
                        description: "nombre producto"
                        },
                        price:{
                        bsonType:"double",
                        description: "precio producto"
                        },
                        quantity:{
                        bsonType:"double",
                        description: "cantidad producto"
                        },
                        total:{
                        bsonType:"double",
                        description: "total a pagar"
                        },
                        date:{
                        bsonType:"date",
                        description: "fecha de compra"
                        },
                    }
                }
        
            }      
        }
    }
})

## Database Sin validator

db.createCollection("User")
db.createCollection("Client")
db.createCollection("Company")
db.createCollection("Plan")
db.createCollection("Product")
db.createCollection("File")
db.createCollection("Page")
db.createCollection("Web")
db.createCollection("Template")

## Indices 

db.User.createIndex( { email : 1 }, { name: "email_index", unique: true } )
db.Client.createIndex( { idUser : 1 }, { name: "idUser", unique: true } )
db.Plan.createIndex( { name : 1 }, { name: "name_index", unique: true } )
db.Company.createIndex( { nameCompany : 1 }, { name: "nameCompany_index", unique: true } )
db.Company.createIndex( { idUser : 1 }, { name: "User_index", unique: true } )
db.Web.createIndex( { idCompany : 1 }, { name: "idCompany_index", unique: true } )