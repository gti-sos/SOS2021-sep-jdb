<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop, push } from "svelte-spa-router";

    async function loadGraph() {
        let futbolData = [];
        
        const resData2 = await fetch(
            "https://apiv3.apifootball.com/?action=get_standings&league_id=302&APIkey=238fa8f2f748e83ca2569474a8f848897110a90bb6837bd17d6cdc66a02eb14a"
        );
        futbolData = await resData2.json();

       
        var suma1 = 0;
        var suma2 = 0;
        var equipo=[];
        var equipo2=[];
        
        futbolData.forEach((campo) => {
          suma1=suma1+campo.overall_league_payed;
                
        });

        futbolData.forEach((campo) => {
           suma2=suma2 +campo.overall_league_W;
                
        });

        futbolData.forEach((campo) => {
           equipo=campo.team_name;
                
        });
        futbolData.forEach((campo) => {
            equipo2.push({y:campo.overall_league_W,label:campo.team_name});
                
        });

        
        var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	title:{
		text: "datos de futbol",
		horizontalAlign: "left"
	},
	data: [{
		type: "doughnut",
		startAngle: 60,
		indexLabelFontSize: 17,
		

		dataPoints:equipo2,
		
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
