<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    async function loadGraph() {
        let depressionData = [];
        let depressionDataGraph = [];

        const resData = await fetch("/api/v2/depression_stats");
        depressionData = await resData.json();

        var ejeX = [
            "depression_men",
            "depression_women",
            "depression_population",
        ];

        depressionData.forEach((x) => {
            ejeX.push(x.country),
                depressionDataGraph.push({
                    name: x.country + " " + x.year,
                    data: [
                        parseInt(x.depression_men),
                        parseInt(x.depression_women),
                        parseInt(x.depression_population),
                    ],
                    pointPlacement: "on",
                });
        });
        Highcharts.chart("container", {
            chart: {
                type: "area",
                inverted: true,
            },
            title: {
                text: "Depresion por provincias",
            },
            accessibility: {
                keyboardNavigation: {
                    seriesNavigation: {
                        mode: "serialize",
                    },
                },
            },
            legend: {
                layout: "vertical",
                align: "right",
                verticalAlign: "top",
                x: -150,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor ||
                    "#FFFFFF",
            },
            xAxis: {
                categories: ejeX,
            },
            yAxis: {
                title: {
                    text: "Number of units",
                },
                allowDecimals: false,
                min: 0,
            },
            plotOptions: {
                area: {
                    fillOpacity: 0.5,
                },
            },
            series: depressionDataGraph,
        });
    }
</script>

<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script
        src="https://code.highcharts.com/modules/accessibility.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">
            En este grafico podemos ver las estadisticas de la depresion de los
            hombres ,mujeres y poblacion total por provincias de españa.
        </p>
    </figure>

    <Button outline color="secondary" on:click={pop}>
        <i class="fas fa-arrow-circle-left" /> Volver
    </Button>
</main>

<style>
    #container {
        height: 410px;
    }

    .highcharts-figure,
    .highcharts-data-table table {
        min-width: 320px;
        max-width: 800px;
        margin: 1em auto;
    }

    .highcharts-data-table table {
        font-family: Verdana, sans-serif;
        border-collapse: collapse;
        border: 1px solid #ebebeb;
        margin: 10px auto;
        text-align: center;
        width: 100%;
        max-width: 500px;
    }
    .highcharts-data-table caption {
        padding: 1em 0;
        font-size: 1.2em;
        color: #555;
    }
    .highcharts-data-table th {
        font-weight: 600;
        padding: 0.5em;
    }
    .highcharts-data-table td,
    .highcharts-data-table th,
    .highcharts-data-table caption {
        padding: 0.5em;
    }
    .highcharts-data-table thead tr,
    .highcharts-data-table tr:nth-child(even) {
        background: #f8f8f8;
    }
    .highcharts-data-table tr:hover {
        background: #f1f7ff;
    }
</style>
