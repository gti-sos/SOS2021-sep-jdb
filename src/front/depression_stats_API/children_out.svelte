<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    async function loadGraph() {
        let depressionData = [];
        let childrenData = [];
        
        const resData = await fetch(
            "/api/v2/depression_stats"
        );

        const resData2 = await fetch(
            "http://sos2021-24.herokuapp.com/api/v2/children-out-school/"
        );
        depressionData = await resData.json();
        childrenData = await resData2.json();

        var ejeX = [
            "children_out_school_male",
            "children_out_school_female",
            "children_out_school_total",
        ];
        
        var coordenadasDepresion=[];
        var coordenadasChildren=[];
        
        depressionData.forEach((campo) => {
           coordenadasDepresion.push({x:campo.year,y:campo.depression_men});
                
        });
        childrenData.forEach((campo) => {
           coordenadasChildren.push({x:campo.year,y:campo.children_out_school_male/10000});
                
        });

        
            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                title: {
                    text: "Depresion y abandono escolar por año",
                },
                axisY: {
                    includeZero: false,
                  
                },
                toolTip: {
                    shared: true,
                },
                legend: {
                    fontSize: 13,
                },
                data: [
                    {
                        type: "splineArea",
                        showInLegend: true,
                        name: "children",
                    
                        dataPoints: coordenadasChildren,
                    },
                    {
                        type: "splineArea",
                        showInLegend: true,
                        name: "depression",
                        dataPoints: coordenadasDepresion,
                    },
                   
                ],
            });
            chart.render();
        
    }
</script>

<main>
    <div id="chartContainer" style="height: 370px; width: 100%;" />
    <script
        type="text/javascript"
        src="https://canvasjs.com/assets/script/canvasjs.min.js"  on:load={loadGraph}></script>
    <div
        style="margin-top:16px;color:dimgrey;font-size:9px;font-family: Verdana, Arial, Helvetica, sans-serif;text-decoration:none;"
    >
        Source:
        <a
            href="https://canvasjs.com/javascript-charts/multi-series-spline-area-chart/"
            target="_blank"
            title="JavaScript Multi Series Spline Area Charts "
            >https://canvasjs.com/javascript-charts/multi-series-spline-area-chart/</a
        >
    </div>
    <Button outline color="secondary" on:click={pop}>
        <i class="fas fa-arrow-circle-left" /> Volver
    </Button>
</main>
