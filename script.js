function toggleDatas() {

    const checkbox =
        document.getElementById("diasDiferentes");

    const camposData =
        document.getElementById("camposData");

    camposData.style.display =
        checkbox.checked ? "block" : "none";
}

function formatarTempo(totalSegundos) {

    totalSegundos = Math.round(totalSegundos);

    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);

    return `${String(horas).padStart(2,'0')}:${String(minutos).padStart(2,'0')}`;
}

function calcular() {

    const diasDiferentes =
        document.getElementById("diasDiferentes").checked;

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

    let tempoTotalSegundos;

    if (diasDiferentes) {

        const dataInicio =
            document.getElementById("dataInicio").value;

        const dataFim =
            document.getElementById("dataFim").value;

        if (!dataInicio || !dataFim) {
            alert("Informe as datas.");
            return;
        }

        const inicio =
            new Date(`${dataInicio}T${horaInicio}`);

        const fim =
            new Date(`${dataFim}T${horaFim}`);

        if (fim < inicio) {
            alert("Data/Hora final menor que a inicial.");
            return;
        }

        tempoTotalSegundos =
            (fim - inicio) / 1000;

    } else {

        const [inicioHora, inicioMin] =
            horaInicio.split(":").map(Number);

        const [fimHora, fimMin] =
            horaFim.split(":").map(Number);

        const inicioSegundos =
            (inicioHora * 3600) + (inicioMin * 60);

        const fimSegundos =
            (fimHora * 3600) + (fimMin * 60);

        tempoTotalSegundos =
            fimSegundos - inicioSegundos;

        if (tempoTotalSegundos < 0) {
            tempoTotalSegundos += 24 * 3600;
        }
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