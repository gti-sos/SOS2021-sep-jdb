<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    async function loadGraph() {
        let depressionData = [];
        let obesityData = [];
        
        const resData = await fetch(
            "/api/v2/depression_stats"
        );

        const resData2 = await fetch(
            "http://sos2021-10.herokuapp.com/api/integration/obesity-stats"
        );
        depressionData = await resData.json();
        obesityData = await resData2.json();

        var suma1 = 0;
        var suma2 = 0;
        var suma3 = 0;
        var suma4 = 0;
        
        
        depressionData.forEach((campo) => {
            suma3 = campo.depression_men ;
                
        });
        
        
        depressionData.forEach((campo) => {
            suma2 = campo.depression_women ;
                
        });
        obesityData.forEach((campo) => {
            suma4 = campo.woman_percent ;
           
                
        });
        obesityData.forEach((campo) => {
            suma1 = campo.man_percent ;
           
                
        });

        
        var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2", // "light1", "light2", "dark1", "dark2"
	title:{
		text: "Comparacion de datos de obesidad y depresion "
	},
	axisY: {
		title: "casos"
	},
	data: [{        
		type: "column",  
		showInLegend: true, 
		legendMarkerColor: "grey",
		legendText: " pobacion afectada",
		dataPoints:[ { y: suma1, label: "obesidad hombre" },
        {
                            y: suma2,
                            label: "depresion mujer",
                        }, {
                            y: suma3,
                            label: "depresion hombre",
                        },
                        {
                            y: suma4,
                            label: "obesidad mujer",
                        },
		]
	}]
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
