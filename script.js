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

function formatarDataHora(data) {

    const dia = String(data.getDate()).padStart(2,'0');
    const mes = String(data.getMonth() + 1).padStart(2,'0');
    const ano = data.getFullYear();

    const hora = String(data.getHours()).padStart(2,'0');
    const minuto = String(data.getMinutes()).padStart(2,'0');

    return `${dia}/${mes}/${ano} - ${hora}:${minuto}`;
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
    let inicioTabela;
    let fimTabela;

    if (diasDiferentes) {

        const dataInicio =
            document.getElementById("dataInicio").value;

        const dataFim =
            document.getElementById("dataFim").value;

        if (!dataInicio || !dataFim) {
            alert("Informe as datas.");
            return;
        }

        inicioTabela =
            new Date(`${dataInicio}T${horaInicio}`);

        fimTabela =
            new Date(`${dataFim}T${horaFim}`);

        if (fimTabela < inicioTabela) {
            alert("Data/Hora final menor que a inicial.");
            return;
        }

        tempoTotalSegundos =
            (fimTabela - inicioTabela) / 1000;

    } else {

        const hoje = new Date();

        inicioTabela = new Date();
        inicioTabela.setHours(
            Number(horaInicio.split(":")[0]),
            Number(horaInicio.split(":")[1]),
            0,
            0
        );

        fimTabela = new Date();
        fimTabela.setHours(
            Number(horaFim.split(":")[0]),
            Number(horaFim.split(":")[1]),
            0,
            0
        );

        if (fimTabela < inicioTabela) {
            fimTabela.setDate(fimTabela.getDate() + 1);
        }

        tempoTotalSegundos =
            (fimTabela - inicioTabela) / 1000;
    }

    const downtimeSegundos =
        tempoTotalSegundos * peso;

    const tempoTotalMinutos =
        tempoTotalSegundos / 60;

    let classificacao = "";

    if (tempoTotalMinutos <= 30) {
        classificacao = "🔵";
    }
    else if (tempoTotalMinutos <= 60) {
        classificacao = "🟢";
    }
    else if (tempoTotalMinutos <= 120) {
        classificacao = "🟡";
    }
    else if (tempoTotalMinutos <= 240) {
        classificacao = "🟠";
    }
    else {
        classificacao = "🔴";
    }

    document.getElementById("minutos").innerText =
        `${Math.round(tempoTotalMinutos)} min`;

    document.getElementById("mttr").innerText =
        formatarTempo(tempoTotalSegundos);

    document.getElementById("downtime").innerText =
        formatarTempo(downtimeSegundos);

    document.getElementById("classificacao").innerText =
        classificacao;

    document.getElementById("tblInicio").innerText =
        formatarDataHora(inicioTabela);

    document.getElementById("tblFim").innerText =
        formatarDataHora(fimTabela);

    document.getElementById("tblImpacto").innerText =
    `${classificacao} ${Math.round(tempoTotalMinutos)} min`;

    document.getElementById("tblClassificacao").innerText =
        classificacao;

    document.getElementById("resultado").style.display =
        "block";

    document.getElementById("tabelaContainer").style.display =
        "block";
}