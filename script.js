function converterParaSegundos(tempoStr) {

    const partes = tempoStr.split(":").map(Number);

    let minutos = 0;
    let segundos = 0;

    if (partes.length === 2) {
        minutos = partes[0];
        segundos = partes[1];
    }
    else if (partes.length === 1) {
        minutos = partes[0];
    }
    else {
        return 0;
    }

    return (minutos * 60) + segundos;
}

function formatarTempo(totalSegundos) {

    totalSegundos = Math.round(totalSegundos);

    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;

    return `${String(minutos).padStart(2,'0')}:${String(segundos).padStart(2,'0')}`;
}

function calcular() {

    const tempoInformado =
        document.getElementById("tempo").value.trim();

    const peso =
        parseFloat(document.getElementById("sintoma").value);

    const tempoTotalSegundos =
        converterParaSegundos(tempoInformado);

    if (tempoTotalSegundos <= 0) {
        alert("Informe um tempo válido.");
        return;
    }

    const downtimeSegundos =
        tempoTotalSegundos * peso;

    const tempoTotalMinutos =
        tempoTotalSegundos / 60;

    let classificacao = "";

    if (tempoTotalMinutos <= 30) {
        classificacao = "🔵 Excelente";
    }
    else if (tempoTotalMinutos <= 60) {
        classificacao = "🟢 Bom";
    }
    else if (tempoTotalMinutos <= 120) {
        classificacao = "🟡 Aceitável";
    }
    else if (tempoTotalMinutos <= 240) {
        classificacao = "🟠 Atenção";
    }
    else {
        classificacao = "🔴 Crítico";
    }

    document.getElementById("mttr").innerText =
        formatarTempo(tempoTotalSegundos);

    document.getElementById("downtime").innerText =
        formatarTempo(downtimeSegundos);

    document.getElementById("classificacao").innerText =
        classificacao;

    document.getElementById("resultado").style.display =
        "block";
}