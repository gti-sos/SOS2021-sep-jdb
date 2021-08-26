<script>
    import Button from "sveltestrap/src/Button.svelte";
    import { pop, push } from "svelte-spa-router";

    async function loadGraph() {
       
        let futbolData = [];
        

        const resData= await fetch(
            "https://breakingbadapi.com/api/episodes"
        );
        
        futbolData = await resData.json();

       
        var episodio=[];
        
        futbolData.forEach((campo) => {
          
            episodio.push({y:campo.episode_id,label:campo.title});
            console.log(episodio);
        });

      
        var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	exportEnabled: true,
	theme: "light1",
	title:{
		text: "Episodios de breaking bad"
	},
	data: [{
		type: "pyramid",
		indexLabelFontColor: "black",
		indexLabelFontSize: 10,
		dataPoints: episodio
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
