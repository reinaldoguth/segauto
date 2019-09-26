"use strict";

// Inicio
queryShow();


// Botão novo registro
$("#btnNew").on("click",function(){
    
    // Limpa form
    $('#formNew').each (function(){
        this.reset();
    });

    $("#panQuery").fadeOut("slow", ()=>{
        $("#panEdit").fadeOut("fast",()=>{
             $("#panNew").fadeIn()
        })
    })
})


// Botão procura por apólice
$("#btnFormSearchApolice").on("click", function(){
    let valor = $("#formSearch").val();
    queryShow(valor, '');
});


// Botão procura por documento
$("#btnFormSearchDoc").on("click", function(){
    let valor = $("#formSearch").val();
    queryShow('', valor);
});


// Botão cancelar edição/inserção
$(".btnFormCancelar").on("click", ()=>{
    $("#panNew").fadeOut("slow", function(){
        $("#panEdit").hide();
        $("#panQuery").fadeIn("fast")
    })
})


// Botão salvar novo registro
$("#btnFormSaveNew").on("click", function(){
    // $("#divQueryMensagem").html("Nova apólice adicionada com sucesso.");
    formSaveNew();
});


// Botão salvar edição
$("#btnFormSaveEdit").on("click", function(){
    // $("#divQueryMensagem").html("Alterações aplicadas na apólice, com sucesso.");
    formSaveEdit();
});



/**
 * Função que retorna registro(s) para a grid de consulta
 */
function queryShow(id, doc){
    $("#panQueryView >table>tbody").html("<tr><td colspan=100% class='text-center'>Buscando a lista no servidor...</td></tr>");
    $("#panNew").fadeOut("slow", function(){
        $("#panEdit").hide();
        $("#panQuery").fadeIn("fast", function(){

            // let valor = $("#formSearch").val();            

            $.ajax({
                url: "php/conn.php",
                data: {acao: 'view', id: id, doc: doc},
                dataType: "json",
                success: function(res){
                  
                  let linhas = "", oObj, cols;
                  let aRes = res.data;

                //   console.log('aRes', aRes[0]);

                  $("#panQueryView >table>tbody").html("");

                  for (var i=0;i<(aRes.length);i++) {

                    oObj = aRes[i];                    
                    console.log(oObj);
                    
                    cols  = '<td>&nbsp;'+oObj.id+'</td>';
                    cols += '<td>&nbsp;'+oObj.apolice+'</td>';
                    cols += '<td>&nbsp;'+oObj.doc+'</td>';
                    cols += '<td>&nbsp;'+oObj.placa+'</td>';
                    cols += '<td>&nbsp;'+oObj.premio+'</td>';
                    cols += '<td>&nbsp;<button class="btn btn-sm btn-info" onclick="regEdit('+oObj.id+');">Editar</button>&nbsp;<button class="btn btn-sm btn-danger" onclick="regDelete('+oObj.id+');">Apagar</button></td>';
          
                    linhas += '<tr>'+cols+'</tr>';
          
                  }
          
                  $("#panQueryView >table>tbody").html(linhas);

        
                },
                error: function(result){
                  console.log('erro: ', result);
                  $("#panQueryView >table>tbody").html("<tr><td colspan=100% class='text-center'>Erro ao tentar carregar a lista</td></tr>");
        
                }
            });
        });
    })
 
}



/*****/
function regEdit(id){
    console.log("edicao", id);
    $("#divQueryMensagem").html("Buscando a apólice no servidor...");

    $.ajax({
        url: "php/conn.php",
        data: {acao: 'view', id: id},
        dataType: "json",
        success: function(res){
                    
          let aRes = res.data, oObj;

          console.log('aRes', aRes);

          oObj = aRes[0];
          console.log(oObj);

          $("#divQueryMensagem").html("");

          // Limpa form
          $('#formEdit').each (function(){
              this.reset();
          });


          $("#formIdEdit").val(oObj.id);
          $("#formApoliceEdit").val(oObj.apolice);
          $("#formDocEdit").val(oObj.doc);
          $("#formPlacaEdit").val(oObj.placa);
          $("#formPremioEdit").val(oObj.premio);
          
          $("#panQuery").fadeOut("slow", function(){
              $("#panEdit").fadeIn();
          })

        },
        error: function(result){
          console.log('erro: ', result);
          alert("Erro ao tentar carregar a apólice para edição");
          $("#divQueryMensagem").html("Erro ao tentar carregar a apólice para edição");

        }
    });

};




/*****/
function formSaveNew(){
    
    $("#divQueryMensagem").html("Adicionando a apólice, aguarde...");

    let data = $("#formNew").serialize();
    console.log("form", data);

    $.ajax({
        url: "php/conn.php",
        data: {acao: 'insert', data: data},
        dataType: "json",
        success: function(aRes){

          console.log('aRes', aRes);

          if (aRes.code){
              queryShow();
          } else {
              alert(aRes.mensagem)
          }

          $("#divQueryMensagem").html(aRes.mensagem);

        },
        error: function(result){
            let mensagem = result.responseText;
          console.log('erro: ', mensagem);
          alert(mensagem);
          $("#divQueryMensagem").html(mensagem);
        }
    });

};





/*****/
function formSaveEdit(){
    
    $("#divQueryMensagem").html("Atualizando a apólice, aguarde...");

    let data = $("#formEdit").serialize();
    console.log("form", data);

    $.ajax({
        url: "php/conn.php",
        data: {acao: 'update', data: data},
        dataType: "json",
        success: function(aRes){

          console.log('aRes', aRes);

          if (aRes.code){
              queryShow();
          } else {
              alert(aRes.mensagem)
          }

          $("#divQueryMensagem").html(aRes.mensagem);

        },
        error: function(result){
            let mensagem = result.responseText;
          console.log('erro: ', mensagem);
          alert(mensagem);
          $("#divQueryMensagem").html(mensagem);
        }
    });

};





/*****/
function regDelete(id){

    if ( ! confirm("Deseja realmente apagar a apólice?") ) {
        return false;
    }

    $("#divQueryMensagem").html("Apagando a apólice, aguarde...");

    $.ajax({
        url: "php/conn.php",
        data: {acao: 'delete', id: id},
        dataType: "json",
        success: function(aRes){

          console.log('aRes', aRes);

          if (aRes.code){
              queryShow();
          } else {
              alert(aRes.mensagem)
          }

          $("#divQueryMensagem").html(aRes.mensagem);

        },
        error: function(result){
            let mensagem = result.responseText;
          console.log('erro: ', mensagem);
          alert(mensagem);
          $("#divQueryMensagem").html(mensagem);
        }
    });

};

