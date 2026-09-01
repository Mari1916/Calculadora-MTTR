// =====================================================
// FORMATAÇÃO DE TEMPO
// =====================================================

function formatarTempo(totalSegundos) {

    totalSegundos = Math.round(totalSegundos);

    const horas =
        Math.floor(totalSegundos / 3600);

    const minutos =
        Math.floor((totalSegundos % 3600) / 60);

    const segundos =
        totalSegundos % 60;

    return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}


// =====================================================
// FORMATAÇÃO DE DATA E HORA
// =====================================================

function formatarDataHora(data) {

    const dia =
        String(data.getDate()).padStart(2, "0");

    const mes =
        String(data.getMonth() + 1).padStart(2, "0");

    const ano =
        data.getFullYear();

    const hora =
        String(data.getHours()).padStart(2, "0");

    const minuto =
        String(data.getMinutes()).padStart(2, "0");

    return `${dia}/${mes}/${ano} - ${hora}:${minuto}`;
}


// =====================================================
// FORMATAÇÃO DE MINUTOS
// =====================================================

function formatarMinutos(minutos) {

    return Number(minutos.toFixed(1))
        .toString()
        .replace(".", ",");
}


// =====================================================
// CALCULAR SEGUNDOS EM HORAS ÚTEIS
// =====================================================
//
// Horário considerado:
// Segunda a sexta
// 07:00 até 18:00
//
// Sábado e domingo não são contabilizados.
// =====================================================

function calcularSegundosHorasUteis(inicio, fim) {

    let totalSegundos = 0;

    let atual = new Date(inicio);

    while (atual < fim) {

        const diaDaSemana =
            atual.getDay();

        // 0 = Domingo
        // 6 = Sábado
        const diaUtil =
            diaDaSemana >= 1 &&
            diaDaSemana <= 5;

        // =================================================
        // FINAL DE SEMANA
        // =================================================

        if (!diaUtil) {

            atual.setDate(
                atual.getDate() + 1
            );

            atual.setHours(7, 0, 0, 0);

            continue;
        }


        // =================================================
        // INÍCIO DO EXPEDIENTE
        // =================================================

        const inicioExpediente =
            new Date(atual);

        inicioExpediente.setHours(
            7,
            0,
            0,
            0
        );


        // =================================================
        // FIM DO EXPEDIENTE
        // =================================================

        const fimExpediente =
            new Date(atual);

        fimExpediente.setHours(
            18,
            0,
            0,
            0
        );


        // =================================================
        // ANTES DAS 07:00
        // =================================================

        if (atual < inicioExpediente) {

            atual =
                new Date(inicioExpediente);

        }


        // =================================================
        // DEPOIS DAS 18:00
        // =================================================

        if (atual >= fimExpediente) {

            atual.setDate(
                atual.getDate() + 1
            );

            atual.setHours(
                7,
                0,
                0,
                0
            );

            continue;
        }


        // =================================================
        // DEFINE O FINAL DO INTERVALO
        // =================================================

        const fimDoIntervalo =
            fim < fimExpediente
                ? fim
                : fimExpediente;


        // =================================================
        // SOMA O TEMPO ÚTIL
        // =================================================

        if (fimDoIntervalo > atual) {

            totalSegundos +=
                (fimDoIntervalo - atual) / 1000;

        }


        // =================================================
        // PRÓXIMO DIA
        // =================================================

        atual.setDate(
            atual.getDate() + 1
        );

        atual.setHours(
            7,
            0,
            0,
            0
        );
    }

    return totalSegundos;
}


// =====================================================
// CALCULAR
// =====================================================

function calcular() {

    // =================================================
    // CAMPOS
    // =================================================

    const dataInicio =
        document.getElementById("dataInicio").value;

    const dataFim =
        document.getElementById("dataFim").value;

    const horaInicio =
        document.getElementById("horaInicio").value;

    const horaFim =
        document.getElementById("horaFim").value;

    const peso =
        parseFloat(
            document.getElementById("sintoma").value
        );


    // =================================================
    // HORAS ÚTEIS
    // =================================================

    const apenasHorasUteis =
        document.getElementById("apenasHorasUteis")?.checked || false;


    // =================================================
    // VALIDAÇÃO
    // =================================================

    if (
        !dataInicio ||
        !dataFim ||
        !horaInicio ||
        !horaFim
    ) {

        alert("Preencha todos os campos.");

        return;
    }


    // =================================================
    // CRIA DATAS
    // =================================================

    const inicio =
        new Date(
            `${dataInicio}T${horaInicio}`
        );

    const fim =
        new Date(
            `${dataFim}T${horaFim}`
        );


    // =================================================
    // VALIDAÇÃO DA DATA
    // =================================================

    if (fim < inicio) {

        alert(
            "A data/hora final não pode ser menor que a inicial."
        );

        return;
    }


    // =================================================
    // CÁLCULO DO TEMPO TOTAL
    // =================================================

    let tempoTotalSegundos;


    if (apenasHorasUteis) {

        // Calcula somente:
        // Segunda a sexta
        // 07:00 até 18:00

        tempoTotalSegundos =
            calcularSegundosHorasUteis(
                inicio,
                fim
            );

    } else {

        // Cálculo normal:
        // 24 horas por dia

        tempoTotalSegundos =
            (fim - inicio) / 1000;
    }


    // =================================================
    // GARANTE QUE NÃO FIQUE NEGATIVO
    // =================================================

    tempoTotalSegundos =
        Math.max(
            0,
            tempoTotalSegundos
        );


    // =================================================
    // DOWNTIME
    // =================================================

    const downtimeSegundos =
        tempoTotalSegundos * peso;


    // =================================================
    // MINUTOS
    // =================================================

    const tempoTotalMinutos =
        tempoTotalSegundos / 60;


    // =================================================
    // CLASSIFICAÇÃO
    // =================================================

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


    // =================================================
    // EXIBIR RESULTADOS
    // =================================================

    document.getElementById("minutos").innerText =
        `${formatarMinutos(tempoTotalMinutos)} min`;


    document.getElementById("mttr").innerText =
        formatarTempo(
            tempoTotalSegundos
        );


    document.getElementById("downtime").innerText =
        formatarTempo(
            downtimeSegundos
        );


    document.getElementById("tblInicio").innerText =
        formatarDataHora(
            inicio
        );


    document.getElementById("tblFim").innerText =
        formatarDataHora(
            fim
        );


    document.getElementById("tblImpacto").innerText =
        `${classificacao} ${formatarMinutos(tempoTotalMinutos)} min`;


    // =================================================
    // MOSTRAR RESULTADOS
    // =================================================

    document.getElementById(
        "tituloPostMortem"
    ).style.display = "block";


    document.getElementById(
        "resultado"
    ).style.display = "block";


    document.getElementById(
        "tituloEmail"
    ).style.display = "block";


    document.getElementById(
        "tabelaContainer"
    ).style.display = "block";
}