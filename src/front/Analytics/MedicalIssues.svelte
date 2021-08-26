<script>
    import Button from "sveltestrap/src/Button.svelte";

    async function loadGraph() {
        //Esta es la gráfica común del grupo.

       
        const depression_stats = await fetch("/api/v2/depression_stats");
        
        

        
        let depression = await depression_stats.json();
       

        
        let depression_stats_data = depression.map((d) => {
            let res = {
                name: d.country + " - " + d.year,
                value: d["depression_women"],
            };
            return res;
        });

       

       

        let dataTotal = [
           
            {
                name: "Datos de depresion de mujeres en el caso de sufrir depresión",
                data: depression_stats_data,
            }
        ];

        Highcharts.chart("container", {
            chart: {
                type: "packedbubble",
                height: "100%",
            },
            title: {
                text: "Mezcla de APIs",
            },
            tooltip: {
                useHTML: true,
                pointFormat: "<b>{point.name}:</b> {point.value}",
            },
            plotOptions: {
                packedbubble: {
                    minSize: "30%",
                    maxSize: "120%",
                    zMin: 0,
                    zMax: 1000,
                    layoutAlgorithm: {
                        splitSeries: false,
                        gravitationalConstant: 0.02,
                    },
                    dataLabels: {
                        enabled: true,
                        format: "{point.name}",
                        filter: {
                            property: "y",
                            operator: ">",
                            value: 250,
                        },
                        style: {
                            color: "black",
                            textOutline: "none",
                            fontWeight: "normal",
                        },
                    },
                },
            },
            series: dataTotal,
        });
    }
    loadGraph();
</script>


<svelte:head>
    <script
        src="https://code.highcharts.com/highcharts.js"
        on:load={loadGraph}></script>
    <script
        src="https://code.highcharts.com/highcharts-more.js"
        on:load={loadGraph}></script>
    <script
        src="https://code.highcharts.com/modules/exporting.js"
        on:load={loadGraph}></script>
    <script
        src="https://code.highcharts.com/modules/accessibility.js"
        on:load={loadGraph}></script>
</svelte:head>

<main>
    <figure class="highcharts-figure">
        <div id="container" />
        <p class="highcharts-description">
            Gráfica que muestra los datos de las 4 APIs: Datos de Ansiedad de
            Hombre (CC.AA, España), Datos de Depresión de Mujer (CC.AA, España),
            Datos de Estrés por población (CC.AA, España) y Datos de Tabaquismo
            de Mujer (Países de Europa).
        </p>
    </figure>
</main>
