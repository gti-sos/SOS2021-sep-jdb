<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop } from "svelte-spa-router";

    async function loadGraph() {
        let depressionData = [];
        let suicideData = [];

        const resData = await fetch("/api/v2/depression_stats");

        const resData2 = await fetch(
            "http://sos2021-27.herokuapp.com/api/integration/suicide-records"
        );
        depressionData = await resData.json();
        suicideData = await resData2.json();
        var suma1 = 0;
        var suma2 = 0;

        depressionData.forEach((campo) => {
            suma2 = campo.depression_women ;
        });
        suicideData.forEach((campo) => {
            suma1 = campo.suic_woman/100 ;
        });

       var chart = new CanvasJS.Chart("chartContainer", {
	exportEnabled: true,
	animationEnabled: true,
	title:{
		text: "Porcentaje de suicidio y depresion de la mujer"
	},
	legend:{
		cursor: "pointer",
		itemclick: explodePie
	},
	data: [{
		type: "pie",
		showInLegend: true,
		toolTipContent: "{name}: <strong>{y}%</strong>",
		indexLabel: "{name} - {y}%",
		dataPoints: [
			{ y: suma1, name: "suicidios mujer" },
                        {
                            y: suma2,
                            name: "depresion mujer",
                        },
		]
	}]
});
chart.render();
}

function explodePie (e) {
	if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
	} else {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
	}
	e.chart.render();

}
</script>

<main>
    <div id="chartContainer" style="height: 370px; width: 100%;" />
    <script
        type="text/javascript"
        src="https://canvasjs.com/assets/script/canvasjs.min.js"
        on:load={loadGraph}></script>
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
