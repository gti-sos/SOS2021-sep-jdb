
<script lang="ts">
	import Router from "svelte-spa-router";
	import NotFound from "./NotFound.svelte";

	import Home from "./Home.svelte";
	import Info from "./Info.svelte";
	import Integrations from "./Integrations.svelte";
	import About from "./About.svelte";



	import depression_stats from "./front/depression_stats_API/App.svelte";
	import edit_depression_stats from "./front/depression_stats_API/DepressionStatsEdit.svelte";

	
	



	import depression_stats_chart from "./front/Analytics/depression/DepressionStatsChart.svelte";

	
	

	
	import children_out from "./front/depression_stats_API/children_out.svelte";
	import suicides from "./front/depression_stats_API/suicides.svelte";
	import obesity from "./front/depression_stats_API/obesity.svelte";
	import Futbol from "./front/depression_stats_API/Futbol_integracion.svelte";
	import bad from "./front/depression_stats_API/bad.svelte";
	
	
	const routes = {
		"/": Home,
		"/info": Info,
		"/integrations": Integrations,
		"/about": About,
		
		"/depression_stats": depression_stats,
		"/depression_stats/:country/:year": edit_depression_stats,
		

		
		"/analytics/depression_stats_chart": depression_stats_chart,

		

		

		
		
		"/integrations/children_out": children_out,
		"/integrations/suicides": suicides,
		"/integrations/obesity": obesity,
		"/integrations/Futbol": Futbol,
		"/integrations/bad": bad,

		
		"*": NotFound,
	};
</script>

<main>
	<Router {routes} />
</main>
