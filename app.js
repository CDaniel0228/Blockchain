// Imports
const  alert =require('alert')
const Blockchain = require("./seguridad/blockchain"); //importamos clase blockchain
const Block = require("./seguridad/block"); //importamos clase block
const express = require('express');
const app = express();
const port = 3000
const blockchain =new Blockchain()
var boletas=5;

app.use(express.json()); //Recibe los datos de las vistas
app.use(express.urlencoded());

// Static Files
app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))



// Set Views
app.set('view engine', 'ejs')

app.get('/', function(req, res){
    res.redirect('/index');
  });

app.get('/index', function(req, res){
    res.render('index')
})


app.post('/', function(req, res) {// Trae los datos de la pagina web
    if(boletas>=1){ //total de voletas
    const k=req.body; //la referencia se almacena en K
    var id_boletas='000000'+boletas; //que boleta tiene el comprador
      const block = new Block({data: [k.cedula, k.nombre, k.correo,k.telefono, id_boletas] }); //se digitan los datos
      blockchain.addBlock(block); //se agrega el bloque a la cadena
      console.clear(); //se limpia la consola
      console.log(JSON.stringify(blockchain, null, 1)); //mustra los datos
      res.redirect('/'); //pide el siguiente block de la cadena
      boletas--;
      alert('Quedan '+boletas+' boletas');
    }else{
        alert('Ya no hay boletas disponibles');
    }
    });

//  Listen on port 3000
app.listen(port, () => {//se escucha el puerto por donde se va a ejecutar
    console.log(`Server funcionando en http://localhost:${port}`); // me dice si esta funcionando y el lugar 
  });