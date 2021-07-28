// Variables
let precioFinal = document.querySelector("#precioFinal");
let medioDePago = document.querySelector("#medioDePago");
let disponibilidad = document.querySelector("#disponibilidad");
let iibb = document.querySelector("#iibb");
const rtaEnPatalla = document.querySelector("#resultado");
const btnCalcular = document.querySelector(".btn_calc");
const btnCalcular2 = document.querySelector(".btn_calc2");
const btnReset = document.querySelector(".btn_reset");
let ahora12 = document.querySelector("#ahora12");
let mPcuotas = document.querySelector("#mPcuotas");
const porcEnPantalla = document.querySelector("#porcentaje");
const formulario = document.querySelector("#formulario");
const opcion1Financiacion = document.querySelector("#cuotasAhora12");
const opcion2Financiacion = document.querySelector("#cuotasMP");
const selectAhora12 = document.querySelector(".cuotasAhora12");
const selectMP = document.querySelector(".cuotasMP");
const opcion3Financiacion = document.querySelector("#sinFinanciacion");
// EVENTOS

eventListeners();

function eventListeners(){

    // Ampliar o disminuir las opciones de disponibilidad de acuerdo al medio de pago elegido
    medioDePago.addEventListener('blur', ampliarOpciones);
    
    // calcule según parámetros 
    if(document.querySelector(".contenedor_btn").contains(document.querySelector(".btn_calc"))) {
        btnCalcular.addEventListener('click', calcular);
    } else {
        btnCalcular2.addEventListener('click', calcular2);
    }
    
    

    // resetear con boton
    btnReset.addEventListener('click', resetearFormulario);

    //seleccionar opcion de financiacion y que muestre el select de la opción elegida

    opcion1Financiacion.addEventListener('click', opcionesAhora12);
    opcion2Financiacion.addEventListener('click', opcionesMP);
    opcion3Financiacion.addEventListener('click', sinFinanciacion);

    // ante un cambio en la seleccion de financiacion se mantienen las cuotas del select anteriormente elegido, deberian
    // resetearse, es decir ponerse en selected al seleccionar otra manera de financiacion de los radios. 
}


// FUNCIONES AMPLIAR OPCIONES

function eliminar2dias() {
    if ((disponibilidad.contains(document.getElementById("2")))) {
        const opc2dias = document.getElementById("2");
        disponibilidad.removeChild(opc2dias);
    }
}

function eliminar70dias() {
    if ((disponibilidad.contains(document.getElementById("70"))))  {
        const opc70dias = document.getElementById("70");
        disponibilidad.removeChild(opc70dias);
    }
}

function agregar70dias() {
    const opcion70dias = document.createElement("option");
    opcion70dias.textContent = "En 70 días";
    opcion70dias.id = 70;
    opcion70dias.value = 70;
    disponibilidad.appendChild(opcion70dias);
}

function removerAtributo() {
    if (disponibilidad.getAttribute("disabled")){
        disponibilidad.removeAttribute("disabled");
    }
}

function ampliarOpciones() {
    
    const opcionElegida = medioDePago.value;

    if (opcionElegida==="point_tc") {

        removerAtributo();
        document.getElementById("10dias").removeAttribute("style","display: none;");
        document.getElementById("2dias").removeAttribute("style","display: none;");
        document.getElementById("18dias").removeAttribute("style","display: none;");
        document.getElementById("35dias").removeAttribute("style","display: none;");
        document.getElementById("70dias").removeAttribute("style","display: none;");

    } else if (opcionElegida==="point_td") {
        
        removerAtributo();
        document.getElementById("2dias").removeAttribute("style","display: none;");
        document.getElementById("10dias").setAttribute("style","display: none;");
        document.getElementById("18dias").setAttribute("style","display: none;");
        document.getElementById("35dias").setAttribute("style","display: none;");
        document.getElementById("70dias").setAttribute("style","display: none;");
        
    } else if ((opcionElegida==="qr_tc")) {
        
        removerAtributo();
        document.getElementById("2dias").setAttribute("style","display: none;");
        document.getElementById("10dias").removeAttribute("style","display: none;");
        document.getElementById("18dias").removeAttribute("style","display: none;");
        document.getElementById("35dias").removeAttribute("style","display: none;");
        document.getElementById("70dias").removeAttribute("style","display: none;");

    } else if ((opcionElegida==="qr_td") || (opcionElegida==="qr_mp")) {

        removerAtributo();

        document.getElementById("2dias").setAttribute("style","display: none;");
        document.getElementById("10dias").setAttribute("style","display: none;");
        document.getElementById("18dias").setAttribute("style","display: none;");
        document.getElementById("35dias").setAttribute("style","display: none;");
        document.getElementById("70dias").setAttribute("style","display: none;");
    
    
    } else if ((opcionElegida==="lp_tc") || (opcionElegida==="lp_td") || (opcionElegida==="lp_mp")){
        
        removerAtributo();
        document.getElementById("2dias").setAttribute("style","display: none;");
        document.getElementById("70dias").setAttribute("style","display: none;");
        document.getElementById("10dias").removeAttribute("style","display: none;");
        document.getElementById("18dias").removeAttribute("style","display: none;");
        document.getElementById("35dias").removeAttribute("style","display: none;");

    } else if ((opcionElegida==="transf") || (opcionElegida==="efvo")) {
        disponibilidad.setAttribute("disabled","disabled");
    }

}

// FUNCIONES CALCULAR - OP DESDE PRECIO TOTAL

function calcular(event) {
    event.preventDefault();

    const medioElegido = medioDePago.value;
    const plazo = disponibilidad.value

    let alicuotaComisionMP;

    // cálculo del % de comisión de MP según medio de pago y disponibilidad

    if (((medioElegido==="point_tc") && (plazo==="0")) || ((medioElegido==="qr_tc") && (plazo==="0")) || ((medioElegido==="lp_tc") && (plazo==="0")) || ((medioElegido==="lp_td") && (plazo==="0")) || ((medioElegido==="lp_mp") && (plazo==="0"))  ){
        alicuotaComisionMP = 0.077319;
    } else if ((medioElegido==="point_tc") && (plazo==="2")){
        alicuotaComisionMP = 0.073689;
    } else if(((medioElegido==="point_tc") && (plazo==="10")) || ((medioElegido==="qr_tc") && (plazo==="10")) || ((medioElegido==="lp_tc") && (plazo==="10")) || ((medioElegido==="lp_td") && (plazo==="10")) || ((medioElegido==="lp_mp") && (plazo==="10"))){
        alicuotaComisionMP = 0.051909;
    } else if((medioElegido==="point_tc") && (plazo==="18")){
        alicuotaComisionMP = 0.041019;
    } else if((medioElegido==="point_tc") && (plazo==="35")){
        alicuotaComisionMP = 0.021659;
    } else if (((medioElegido==="point_tc") && (plazo==="70")) || ((medioElegido==="qr_tc") && (plazo==="70"))) {
        alicuotaComisionMP = 0;
    } else if((medioElegido==="point_td") && (plazo==="0")){
        alicuotaComisionMP = 0.039809;
    } else if((medioElegido==="point_td") && (plazo==="2")) {
        alicuotaComisionMP = 0.037389;
    } else if ((medioElegido==="qr_tc") && (plazo==="18")) {
        alicuotaComisionMP = 0.036179;
    } else if (((medioElegido==="lp_tc") && (plazo==="18")) || ((medioElegido==="lp_td") && (plazo==="18")) || ((medioElegido==="lp_mp") && (plazo==="18")) ){
        alicuotaComisionMP = 0.042229;
    } else if (((medioElegido==="lp_tc") && (plazo==="35")) || ((medioElegido==="lp_td") && (plazo==="35")) || ((medioElegido==="lp_mp") && (plazo==="35")) ){
        alicuotaComisionMP = 0.024079;
    } else if ((medioElegido==="qr_tc") && (plazo==="35")){
        alicuotaComisionMP = 0.018029;
    } else if ((medioElegido==="qr_td") && (plazo==="0")) {
        alicuotaComisionMP = 0.011979;
    } else if ((medioElegido==="qr_mp") && (plazo==="0")) {
        alicuotaComisionMP = 0.00968;
    } else {
        alicuotaComisionMP = 0;
    }

    // alícuota de financiación con ahora 12
    const cuotasAhora12 = ahora12.value;

    let alicuotaAhora12;

    if (cuotasAhora12==="0" && document.getElementById("cuotasAhora12").checked) {
        alicuotaAhora12 = 0;
    } else if (cuotasAhora12==="3" && document.getElementById("cuotasAhora12").checked) {
        alicuotaAhora12 = 0.03751;
    } else if (cuotasAhora12==="6" && document.getElementById("cuotasAhora12").checked) {
        alicuotaAhora12 = 0.072721;
    } else if (cuotasAhora12==="12" && document.getElementById("cuotasAhora12").checked) {
        alicuotaAhora12 = 0.138908;
    } else if (cuotasAhora12==="18" && document.getElementById("cuotasAhora12").checked){
        alicuotaAhora12 = 0.199892;
    } else {
        alicuotaAhora12 = 0;
    }


    console.log(cuotasAhora12);
    console.log(alicuotaAhora12);

    //alícuota financiación Mercado pago 
    const cuotasFmp = mPcuotas.value;
    let alicuotaFinanMP;

    if (cuotasFmp==="0" && document.getElementById("cuotasMP").checked) {
        alicuotaFinanMP = 0;
    } else if (cuotasFmp==="3" && document.getElementById("cuotasMP").checked) {
        alicuotaFinanMP = 0.121;
    } else if (cuotasFmp==="6" && document.getElementById("cuotasMP").checked) {
        alicuotaFinanMP = 0.2178;
    } else if (cuotasFmp==="9" && document.getElementById("cuotasMP").checked) {
        alicuotaFinanMP= 0.3388;
    } else if (cuotasFmp==="12" && document.getElementById("cuotasMP").checked){
        alicuotaFinanMP = 0.3993;
    } else {
        alicuotaFinanMP = 0;
    }
    console.log(alicuotaFinanMP);


    // alícuota IIBB

    const alicuotaIIBB = parseFloat(iibb.value);

    // cálculo final 

    const precioPartida = parseFloat(precioFinal.value);

    const comisionMP = precioPartida*alicuotaComisionMP;
    const comisionFinMP = precioPartida*alicuotaFinanMP;
    const comisionAhora12 = precioPartida*alicuotaAhora12;
    const impuestoIIBB = precioPartida*alicuotaIIBB;

    const plataDisponible = precioPartida - comisionMP - comisionAhora12 - impuestoIIBB - comisionFinMP;
    
    
    rtaEnPatalla.value = plataDisponible.toFixed(2);

    // % descontado

    const porcRestante = plataDisponible/precioPartida;
    const porcCosto = 1 - porcRestante;

    if (porcEnPantalla.contains(document.getElementById("porcMostrado"))){
        
        const porcPantalla = document.getElementById("porcMostrado");
        porcPantalla.textContent = (porcCosto*100).toFixed(2) + "%";

    } else {
    const porcPantalla = document.createElement("p");
    porcPantalla.id = "porcMostrado";
    porcPantalla.textContent = (porcCosto*100).toFixed(2) + "%";
    porcEnPantalla.appendChild(porcPantalla);
    }

    // valores en el detalle:

    function financiacionEle() {
        if(comisionAhora12===0) {
            return comisionFinMP.toFixed(2);
        } else {
            return comisionAhora12.toFixed(2);
        }
    }

    function alicuotaDeFinan() {
        if(comisionAhora12===0) {
            return (alicuotaFinanMP*100).toFixed(2);
        } else {
            return (alicuotaAhora12*100).toFixed(2);
        }
    }

    function montoTotalDescontado() {
        if (alicuotaAhora12===0) {
            const montoDescontado = comisionMP + comisionFinMP + impuestoIIBB;
            return montoDescontado.toFixed(2);
        } else {
            const montoDescontado = comisionMP + comisionAhora12 + impuestoIIBB;
            return montoDescontado.toFixed(2);
        }
    
    }
    if (document.getElementById("PV").contains(document.getElementById("pvPantalla"))){
        
        const pvPantalla = document.getElementById("pvPantalla");
        pvPantalla.textContent = "$ " + precioPartida;
     } else {
    const pvPantalla = document.createElement("p");
    pvPantalla.id = "pvPantalla";
    pvPantalla.textContent = "$ " + precioPartida;
    document.getElementById("PV").appendChild(pvPantalla);
     }

    if (document.getElementById("CMP").contains(document.getElementById("comMpPantalla"))){
        
        const comMpPantalla = document.getElementById("comMpPantalla");
        comMpPantalla.textContent = "$ " + comisionMP.toFixed(2) + " (Alícuota aplicada: " + (alicuotaComisionMP*100).toFixed(2) + "%)";
    } else {
    const comMpPantalla = document.createElement("p");
    comMpPantalla.id = "comMpPantalla";
    comMpPantalla.textContent = "$ " + comisionMP.toFixed(2) + " (Alícuota aplicada: " + (alicuotaComisionMP*100).toFixed(2) + "%)";
    document.getElementById("CMP").appendChild(comMpPantalla);
    }
    
    if (document.getElementById("CF").contains(document.getElementById("cfPantalla"))){
        
        const cfPantalla = document.getElementById("cfPantalla");
        cfPantalla.textContent = "$ " + financiacionEle() + " (Alícuota aplicada: " + alicuotaDeFinan() + "%)";
        
     } else {
    const cfPantalla = document.createElement("p");
    cfPantalla.id = "cfPantalla";
    cfPantalla.textContent = "$ " + financiacionEle() + " (Alícuota aplicada: " + alicuotaDeFinan() + "%)";
    document.getElementById("CF").appendChild(cfPantalla);
    }


    if (document.getElementById("IB").contains(document.getElementById("ibPantalla"))){
        
        const ibPantalla = document.getElementById("ibPantalla");
        ibPantalla.textContent = "$ " + impuestoIIBB.toFixed(2);
        
     } else {
    const ibPantalla = document.createElement("p");
    ibPantalla.id = "ibPantalla";
    ibPantalla.textContent = "$ " + impuestoIIBB.toFixed(2);
    document.getElementById("IB").appendChild(ibPantalla);
     }

     if (document.getElementById("SFD").contains(document.getElementById("sfdPantalla"))){
        
        const sfdPantalla = document.getElementById("sfdPantalla");
        sfdPantalla.textContent = "$ " + montoTotalDescontado();
        
     } else {
    const sfdPantalla = document.createElement("p");
    sfdPantalla.id = "sfdPantalla";
    sfdPantalla.textContent = "$ " + montoTotalDescontado();
    document.getElementById("SFD").appendChild(sfdPantalla);
     }
}

// FUNCIONES CALCULAR - OP DESDE VALOR A DISPONER 

function calcular2(event) {
    event.preventDefault();

    const medioElegido = medioDePago.value;
    const plazo = disponibilidad.value

    let alicuotaComisionMP;

    // cálculo del % de comisión de MP según medio de pago y disponibilidad

    if (((medioElegido==="point_tc") && (plazo==="0")) || ((medioElegido==="qr_tc") && (plazo==="0")) || ((medioElegido==="lp_tc") && (plazo==="0")) || ((medioElegido==="lp_td") && (plazo==="0")) || ((medioElegido==="lp_mp") && (plazo==="0"))  ){
        alicuotaComisionMP = 0.077319;
    } else if ((medioElegido==="point_tc") && (plazo==="2")){
        alicuotaComisionMP = 0.073689;
    } else if(((medioElegido==="point_tc") && (plazo==="10")) || ((medioElegido==="qr_tc") && (plazo==="10")) || ((medioElegido==="lp_tc") && (plazo==="10")) || ((medioElegido==="lp_td") && (plazo==="10")) || ((medioElegido==="lp_mp") && (plazo==="10"))){
        alicuotaComisionMP = 0.051909;
    } else if((medioElegido==="point_tc") && (plazo==="18")){
        alicuotaComisionMP = 0.041019;
    } else if((medioElegido==="point_tc") && (plazo==="35")){
        alicuotaComisionMP = 0.021659;
    } else if (((medioElegido==="point_tc") && (plazo==="70")) || ((medioElegido==="qr_tc") && (plazo==="70"))) {
        alicuotaComisionMP = 0;
    } else if((medioElegido==="point_td") && (plazo==="0")){
        alicuotaComisionMP = 0.039809;
    } else if((medioElegido==="point_td") && (plazo==="2")) {
        alicuotaComisionMP = 0.037389;
    } else if ((medioElegido==="qr_tc") && (plazo==="18")) {
        alicuotaComisionMP = 0.036179;
    } else if (((medioElegido==="lp_tc") && (plazo==="18")) || ((medioElegido==="lp_td") && (plazo==="18")) || ((medioElegido==="lp_mp") && (plazo==="18")) ){
        alicuotaComisionMP = 0.042229;
    } else if (((medioElegido==="lp_tc") && (plazo==="35")) || ((medioElegido==="lp_td") && (plazo==="35")) || ((medioElegido==="lp_mp") && (plazo==="35")) ){
        alicuotaComisionMP = 0.024079;
    } else if ((medioElegido==="qr_tc") && (plazo==="35")){
        alicuotaComisionMP = 0.018029;
    } else if ((medioElegido==="qr_td") && (plazo==="0")) {
        alicuotaComisionMP = 0.011979;
    } else if ((medioElegido==="qr_mp") && (plazo==="0")) {
        alicuotaComisionMP = 0.00968;
    } else {
        alicuotaComisionMP = 0;
    }

    // alícuota de financiación con ahora 12
    const cuotasAhora12 = ahora12.value;

    let alicuotaAhora12;

    if (cuotasAhora12==="0" && document.getElementById("cuotasAhora12").checked) {
        alicuotaAhora12 = 0;
    } else if (cuotasAhora12==="3" && document.getElementById("cuotasAhora12").checked) {
        alicuotaAhora12 = 0.03751;
    } else if (cuotasAhora12==="6" && document.getElementById("cuotasAhora12").checked) {
        alicuotaAhora12 = 0.072721;
    } else if (cuotasAhora12==="12" && document.getElementById("cuotasAhora12").checked) {
        alicuotaAhora12 = 0.138908;
    } else if (cuotasAhora12==="18" && document.getElementById("cuotasAhora12").checked){
        alicuotaAhora12 = 0.199892;
    } else {
        alicuotaAhora12 = 0;
    }


    console.log(cuotasAhora12);
    console.log(alicuotaAhora12);

    //alícuota financiación Mercado pago 
    const cuotasFmp = mPcuotas.value;
    let alicuotaFinanMP;

    if (cuotasFmp==="0" && document.getElementById("cuotasMP").checked) {
        alicuotaFinanMP = 0;
    } else if (cuotasFmp==="3" && document.getElementById("cuotasMP").checked) {
        alicuotaFinanMP = 0.121;
    } else if (cuotasFmp==="6" && document.getElementById("cuotasMP").checked) {
        alicuotaFinanMP = 0.2178;
    } else if (cuotasFmp==="9" && document.getElementById("cuotasMP").checked) {
        alicuotaFinanMP= 0.3388;
    } else if (cuotasFmp==="12" && document.getElementById("cuotasMP").checked){
        alicuotaFinanMP = 0.3993;
    } else {
        alicuotaFinanMP = 0;
    }
    console.log(alicuotaFinanMP);


    // alícuota IIBB

    const alicuotaIIBB = parseFloat(iibb.value);

    // cálculo final 

    const precioPartida = parseFloat(precioFinal.value);

    const plataDisponible = precioPartida/(1-(alicuotaAhora12+alicuotaComisionMP+alicuotaFinanMP+alicuotaIIBB));

    const comisionMP = plataDisponible*alicuotaComisionMP;
    const comisionFinMP = plataDisponible*alicuotaFinanMP;
    const comisionAhora12 = plataDisponible*alicuotaAhora12;
    const impuestoIIBB = plataDisponible*alicuotaIIBB;

    // const plataDisponible = precioPartida + comisionMP + comisionAhora12 + impuestoIIBB + comisionFinMP;
    
    
    rtaEnPatalla.value = plataDisponible.toFixed(2);

    // % descontado

    const porcRestante = plataDisponible/precioPartida;
    const porcCosto = porcRestante;

    if (porcEnPantalla.contains(document.getElementById("porcMostrado"))){
        
        const porcPantalla = document.getElementById("porcMostrado");
        porcPantalla.textContent = ((porcCosto-1)*100).toFixed(2) + "%";

    } else {
    const porcPantalla = document.createElement("p");
    porcPantalla.id = "porcMostrado";
    porcPantalla.textContent = ((porcCosto-1)*100).toFixed(2) + "%";
    porcEnPantalla.appendChild(porcPantalla);
    }

    // valores en el detalle:

    function financiacionEle() {
        if(comisionAhora12===0) {
            return comisionFinMP.toFixed(2);
        } else {
            return comisionAhora12.toFixed(2);
        }
    }

    function alicuotaDeFinan() {
        if(comisionAhora12===0) {
            return (alicuotaFinanMP*100).toFixed(2);
        } else {
            return (alicuotaAhora12*100).toFixed(2);
        }
    }

    function montoTotalDescontado() {
        if (alicuotaAhora12===0) {
            const montoDescontado = comisionMP + comisionFinMP + impuestoIIBB;
            return montoDescontado.toFixed(2);
        } else {
            const montoDescontado = comisionMP + comisionAhora12 + impuestoIIBB;
            return montoDescontado.toFixed(2);
        }
    
    }
    if (document.getElementById("PV").contains(document.getElementById("pvPantalla"))){
        
        const pvPantalla = document.getElementById("pvPantalla");
        pvPantalla.textContent = "$ " + plataDisponible.toFixed(2);
     } else {
    const pvPantalla = document.createElement("p");
    pvPantalla.id = "pvPantalla";
    pvPantalla.textContent = "$ " + plataDisponible.toFixed(2);
    document.getElementById("PV").appendChild(pvPantalla);
     }

    if (document.getElementById("CMP").contains(document.getElementById("comMpPantalla"))){
        
        const comMpPantalla = document.getElementById("comMpPantalla");
        comMpPantalla.textContent = "$ " + comisionMP.toFixed(2) + " (Alícuota aplicada: " + (alicuotaComisionMP*100).toFixed(2) + "%)";
    } else {
    const comMpPantalla = document.createElement("p");
    comMpPantalla.id = "comMpPantalla";
    comMpPantalla.textContent = "$ " + comisionMP.toFixed(2) + " (Alícuota aplicada: " + (alicuotaComisionMP*100).toFixed(2) + "%)";
    document.getElementById("CMP").appendChild(comMpPantalla);
    }
    
    if (document.getElementById("CF").contains(document.getElementById("cfPantalla"))){
        
        const cfPantalla = document.getElementById("cfPantalla");
        cfPantalla.textContent = "$ " + financiacionEle() + " (Alícuota aplicada: " + alicuotaDeFinan() + "%)";
        
     } else {
    const cfPantalla = document.createElement("p");
    cfPantalla.id = "cfPantalla";
    cfPantalla.textContent = "$ " + financiacionEle() + " (Alícuota aplicada: " + alicuotaDeFinan() + "%)";
    document.getElementById("CF").appendChild(cfPantalla);
    }


    if (document.getElementById("IB").contains(document.getElementById("ibPantalla"))){
        
        const ibPantalla = document.getElementById("ibPantalla");
        ibPantalla.textContent = "$ " + impuestoIIBB.toFixed(2);
        
     } else {
    const ibPantalla = document.createElement("p");
    ibPantalla.id = "ibPantalla";
    ibPantalla.textContent = "$ " + impuestoIIBB.toFixed(2);
    document.getElementById("IB").appendChild(ibPantalla);
     }

     if (document.getElementById("SFD").contains(document.getElementById("sfdPantalla"))){
        
        const sfdPantalla = document.getElementById("sfdPantalla");
        sfdPantalla.textContent = "$ " + montoTotalDescontado();
        
     } else {
    const sfdPantalla = document.createElement("p");
    sfdPantalla.id = "sfdPantalla";
    sfdPantalla.textContent = "$ " + montoTotalDescontado();
    document.getElementById("SFD").appendChild(sfdPantalla);
     }
}

// función reset de formulario

function resetearFormulario(){
    formulario.reset();
} 

// función para mostrar select ahora 12

function opcionesAhora12() {
    
    if (selectMP.className === '') {
        selectMP.classList.add("cuotasMP")
        selectAhora12.classList.toggle("cuotasAhora12");

    } else {

    selectAhora12.classList.toggle("cuotasAhora12");
    }
}

function opcionesMP() {
    if (selectAhora12.className === '') {
        selectAhora12.classList.add("cuotasAhora12")
        selectMP.classList.toggle("cuotasMP");

    } else {
        
        selectMP.classList.toggle("cuotasMP");
    }
}

function sinFinanciacion() {
    if (selectAhora12.className === '') {
        selectAhora12.classList.add("cuotasAhora12")
    } else if (selectMP.className === ''){
        selectMP.classList.add("cuotasMP");
    }
}

// efecto en formulario animacion CSS

document.getElementById("precioDet").addEventListener("click", animacion());

function animacion() {
    var formu = document.getElementById("formulario");
    formu.classList.add("animate__fadeIn");
    var titulo = document.getElementById("titulo");
    titulo.classList.add("animate__fadeInDown")
}

//Animaciones inicio

