# Cadena de conexion Shell

mongosh "mongodb+srv://cluster0.cbi1h.mongodb.net/MakeBusiness" --apiVersion 1 --username admin --password admin

# Cadena Mongo Atlas

mongodb+srv://admin:admin@cluster0.cbi1h.mongodb.net/MakeBusiness
 



## Database 

db.createCollection("User")
db.createCollection("Client")
db.createCollection("Company")
db.createCollection("Plan")
db.createCollection("Product")
db.createCollection("File")
db.createCollection("Page")
db.createCollection("Web")


## Indices 

db.User.createIndex( { email : 1 }, { name: "email_index", unique: true } )
db.Client.createIndex( { idUser : 1 }, { name: "idUser", unique: true } )
db.Plan.createIndex( { name : 1 }, { name: "name_index", unique: true } )
db.Company.createIndex( { nameCompany : 1 }, { name: "nameCompany_index", unique: true } )
db.Company.createIndex( { idUser : 1 }, { name: "User_index", unique: true } )
db.Web.createIndex( { idCompany : 1 }, { name: "idCompany_index", unique: true } )