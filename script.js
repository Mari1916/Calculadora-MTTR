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

    const dataInicio =
        document.getElementById("dataInicio").value;

    const dataFim =
        document.getElementById("dataFim").value;

    const horaInicio =
        document.getElementById("horaInicio").value;

    const horaFim =
        document.getElementById("horaFim").value;

    const peso =
        parseFloat(document.getElementById("sintoma").value);

    if (!dataInicio || !dataFim || !horaInicio || !horaFim) {
        alert("Preencha todos os campos.");
        return;
    }

    const inicio =
        new Date(`${dataInicio}T${horaInicio}`);

    const fim =
        new Date(`${dataFim}T${horaFim}`);

    if (fim < inicio) {
        alert("A data/hora final não pode ser menor que a inicial.");
        return;
    }

    const tempoTotalSegundos =
        (fim - inicio) / 1000;

    const downtimeSegundos =
        tempoTotalSegundos * peso;

    const tempoTotalMinutos =
        Math.round(tempoTotalSegundos / 60);

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
        `${tempoTotalMinutos} min`;

    document.getElementById("mttr").innerText =
        formatarTempo(tempoTotalSegundos);

    document.getElementById("downtime").innerText =
        formatarTempo(downtimeSegundos);

    document.getElementById("tblInicio").innerText =
        formatarDataHora(inicio);

    document.getElementById("tblFim").innerText =
        formatarDataHora(fim);

    document.getElementById("tblImpacto").innerText =
        `${classificacao} ${tempoTotalMinutos} min`;

    document.getElementById("tituloPostMortem").style.display =
        "block";

    document.getElementById("resultado").style.display =
        "block";

    document.getElementById("tituloEmail").style.display =
        "block";

    document.getElementById("tabelaContainer").style.display =
        "block";
}