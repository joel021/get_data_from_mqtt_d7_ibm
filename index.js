var mqtt = require('mqtt');
var name_file = "original_data5.csv" //nome do arquivo que você quer salvar
var options = {
    username:"maratoners", // usuário
    password:"ndsjknvkdnvjsbvj" // senha
}

var client = mqtt.connect("mqtt://tnt-iot.maratona.dev:30573",options)

client.subscribe('tnt',function(err){

    var row = 0;

    var fs = require('fs');
    var firstt_row = -1000

    client.on('message', function(topic, message) {
        var TNT_DATA = JSON.parse(message);
        
        var line = TNT_DATA.row+","+TNT_DATA.Tempo+","+TNT_DATA["Estação"]+","+TNT_DATA.LAT+","+TNT_DATA.LONG+","+TNT_DATA["Movimentação"]+","+TNT_DATA.Original_473+","+TNT_DATA.Original_269+
            ","+TNT_DATA.Zero+","+TNT_DATA["Maçã-Verde"]+","+TNT_DATA.Tangerina+","+TNT_DATA.Citrus+","+TNT_DATA["Açaí-Guaraná"]+","+TNT_DATA["Pêssego"]+","+TNT_DATA.TARGET;
        
            // cria novo arquivo, comente se for rodar o algoritmo várias vezes em cima do mesmo arquivo
            /*
        if (row == 0){
            firstt_row = TNT_DATA.row
            var head = "row,Tempo,Estação,LAT,LONG,Movimentação,Original_473,Original_269,Zero,Maçã-Verde,Tangerina,Citrus,Açaí-Guaraná,Pêssego,TARGET"
            var stream = fs.createWriteStream(name_file);
            stream.once('open', function(fd) {
                stream.write(head+"\n");
                stream.write(line);
            });
        }
            */
        if (row != 0){
            line="\n"+line
            fs.appendFile(name_file, line, function (err) {
                console.log(".")
            });
        }

        if (firstt_row == TNT_DATA.row && row != 0){
            console.log("finished")
            client.unsubscribe("tnt")
        }
        row++;
    });
    
});