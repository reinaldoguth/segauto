<?php
    error_reporting(E_ERROR);

    $jsRtn = Array(
                    code => 0,
                    data => [], 
                    mensagem => "Faltam parâmetros"
                );

    $acao  = $_REQUEST['acao'];
    $id    = $_REQUEST['id'];
    $doc   = $_REQUEST['doc'];
    $data  = $_REQUEST['data'];

    switch ($acao) {
        case 'view':
            $jsRtn = view($id, $doc);
            break;
        case 'insert':
            $jsRtn = insert($data);
            break;
        case 'update':
            $jsRtn = update($data);
            break;
        case 'delete':
            $jsRtn = delete($id);
            break;
    }

echo json_encode($jsRtn);

return false;
//**********************************/




//***
function view($id, $doc){

    $sWhere = $id != null ? " where tb10_id = $id " : "";
    $sWhere = $doc != null ? " where tb10_cpfcnpj like '%".$doc."%' " : $sWhere;

    $aRtn = [];
    $res = query("SELECT * FROM tb10_apolices $sWhere");

    while ($row = mysqli_fetch_array($res)) {
        $aRtn[] = Array(
                            "id" => $row['tb10_id'],
                            "apolice" => $row['tb10_nr'],
                            "doc" =>  $row['tb10_cpfcnpj'],
                            "placa" =>  $row['tb10_placa'],
                            "premio" =>  $row['tb10_valor_premio'],
                        );
    }

    // return $aRtn;
    return Array(
                    code => 1,
                    data => $aRtn, 
                    mensagem => "function view: $id, $doc"
                );
}



//***
function insert($oParams){
    parse_str($oParams, $aDados);

    $res = query("INSERT INTO `rwplusco_segauto`.`tb10_apolices` (`tb10_nr`, `tb10_cpfcnpj`, `tb10_placa`, `tb10_valor_premio`) VALUES (".
                 "'".$aDados[formApoliceNew]."', ".
                 "'".$aDados[formDocNew]."', ".
                 "'".$aDados[formPlacaNew]."', ".
                 "'".$aDados[formPremioNew]."'".
                 ");");

    return view(null, null);
    return Array(
        code => 1,
        data => $res, 
        mensagem => "function insert"
    );    
}




//***
function update($oParams){
    parse_str($oParams, $aDados);

    $res = query("UPDATE `rwplusco_segauto`.`tb10_apolices` SET ".
                    " `tb10_nr` = '".$aDados[formApoliceEdit]."', ".
                    " `tb10_cpfcnpj` = '".$aDados[formDocEdit]."', ".
                    " `tb10_placa` = '".$aDados[formPlacaEdit]."', ".
                    " `tb10_valor_premio` = '".$aDados[formDocEdit]."' ".
                    " WHERE `tb10_id` = '".$aDados[formIdEdit]."' LIMIT 1");

    return Array(
        code => 1,
        data => $res, 
        mensagem => "Apólice atualizada com sucesso."
    );    
}




//***
function delete($id){

    $res = query("DELETE FROM `rwplusco_segauto`.`tb10_apolices` WHERE `tb10_id` = $id LIMIT 1;");

    return Array(
        code => 1,
        data => $res, 
        mensagem => "Apólice apagada com sucesso."
    );    
}


//***
function query($sql){
    $host = "rwplus.com.br";
    $db   = "rwplusco_segauto";
    $user = "rwplusco_segauto";
    $pass = ".segauto@";

    $conn = new mysqli($host, $user, $pass, $db);

    // Check connection
    if(!$conn){
        die("ERROR: Could not connect. " . mysqli_connect_error());
    }

    // $res = mysqli_query($conn, $sql) or die("ERROR: query error.";
    $res = $conn->query($sql) or die("ERROR: query error.");

    mysqli_close($conn);

    return $res;
}
?>