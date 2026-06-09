function formatarTempo(totalSegundos) {

    totalSegundos = Math.round(totalSegundos);

    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    return `${String(horas).padStart(2,'0')}:${String(minutos).padStart(2,'0')}:${String(segundos).padStart(2,'0')}`;
}

function calcular() {

    const horaInicio =
        document.getElementById("horaInicio").value;

    const horaFim =
        document.getElementById("horaFim").value;

    const peso =
        parseFloat(document.getElementById("sintoma").value);

    if (!horaInicio || !horaFim) {
        alert("Informe a hora de início e fim.");
        return;
    }

    const [inicioHora, inicioMin] =
        horaInicio.split(":").map(Number);

    const [fimHora, fimMin] =
        horaFim.split(":").map(Number);

    const inicioSegundos =
        (inicioHora * 3600) + (inicioMin * 60);

    const fimSegundos =
        (fimHora * 3600) + (fimMin * 60);

    let tempoTotalSegundos =
        fimSegundos - inicioSegundos;

    if (tempoTotalSegundos < 0) {
        tempoTotalSegundos += 24 * 3600;
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

    document.getElementById("minutos").innerText =
        `${Math.round(tempoTotalMinutos)} min`;

    document.getElementById("mttr").innerText =
        formatarTempo(tempoTotalSegundos);

    document.getElementById("downtime").innerText =
        formatarTempo(downtimeSegundos);

    document.getElementById("classificacao").innerText =
        classificacao;

    document.getElementById("resultado").style.display =
        "block";
}