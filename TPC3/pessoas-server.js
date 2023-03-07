var http = require('http')
var axios = require('axios')
var mypages = require('./mypages')
var fs = require('fs')

http.createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    if(req.url == '/'){
        axios.get('http://localhost:3000/')
            .then(function(resp){
                var pessoas = resp.data
                console.log("Recuperei " + pessoas.length + " registos")
        
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genMainPage(pessoas, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    else if(req.url.match(/w3.css$/)){
        fs.readFile('w3.css', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/css'})
            if(err){
                res.write("Erro na leitura do ficheiro: " + err)
            }
            else{
                res.write(data)
            }
            res.end()
        })
    }
    else if(req.url == '/pessoas'){
        axios.get('http://localhost:3000/pessoas?_sort=nome&_order=asc')
            .then(function(resp){
                var pessoas = resp.data
                console.log("Recuperei " + pessoas.length + " registos")
        
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.pessoasPage(pessoas, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    else if(req.url == '/sexo'){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
            var m = 0
            var f = 0
            var o = 0
            var pessoas = resp.data
            pessoas.forEach(pessoa => {
                if (pessoa.sexo === 'masculino') {
                    m++
                }else if (pessoa.sexo === 'feminino'){
                    f++
                }else{
                    o++
                }
              });
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.distribuicaoSexoPage(m,f,o,d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    else if(req.url.match(/\/sexo\/(feminino|masculino|outro)/)){
        axios.get('http://localhost:3000/pessoas?sexo='+ req.url.substring(6))            
            .then(function(resp){
                var pessoas = resp.data
                console.log("Recuperei " + pessoas.length + " registos")
        
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.distBySexo(pessoas,req.url.substring(6),d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    else if(req.url ==('/desporto')){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                console.log("Recuperei " + pessoas.length + " registos")
        
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.distribuicaoDesportoPage(pessoas,d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    else if(req.url.match(/\/desporto\/[a-zA-Z]+/)){
        axios.get('http://localhost:3000/pessoas?desportos_like='+ req.url.substring(10))
            .then(function(resp){
                var pessoas = resp.data
                console.log("Recuperei " + pessoas.length + " registos")
        
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.distribuicaoDesportoPessoas(pessoas, req.url.substring(10),d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    else if(req.url.match(/p\d+/)){
        axios.get('http://localhost:3000/pessoas/' + req.url.substring(9))
            .then(function(resp){
                var pessoa = resp.data
                
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genPessoaPage(pessoa, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }
    else if(req.url == '/profissoes'){

        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
            var dic = {}
            var pessoas = resp.data
            pessoas.forEach(pessoa => {
                    if(pessoa.profissao in dic){
                        dic[pessoa.profissao]+=1
                    }else{
                        dic[pessoa.profissao]=1
                    }
                
            })
            var top =  Object.entries(dic).sort(([, a],[, b]) => b-a).slice(0,10)
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.distribuicaoProfissaoPage(top,d))
        })
        .catch(err => {
            console.log("ERRO : " + err)
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end("<p>Erro</p>" + err + "</p>")
        })
    
    }
    else if(req.url.match(/\/profissoes\/.+/) && req.url!='/profissoes/w3.css'){
    
        axios.get('http://localhost:3000/pessoas?profissao='+req.url.substring(12))
            .then(function(resp){
            var pessoas = resp.data
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end(mypages.pessoasPage(pessoas,d))
        })
    
        .catch(err => {
            console.log("ERRO : " + err)
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            res.end("<p>Erro</p>" + err + "</p>")
        })  

    }
    
    else if(req.url == '/ordDesc'){
        axios.get('http://localhost:3000/pessoas')
            .then(function(resp){
                var pessoas = resp.data
                let pessoasOrdenadas = pessoas.sort(
                    (p1, p2) => (p1.nome < p2.nome) ? 1 : -1
                )
        
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(mypages.genMainPage(pessoasOrdenadas, d))
            })
            .catch(erro => {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<p>ERRO: " + erro + "</p>")
            })
    }

    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'})
        res.end("<p>ERRO: OperaÃ§Ã£o nÃ£o suportada...</p>")
    }
    
    
}).listen(7777)

console.log('Servidor a escuta na porta 7777...')
