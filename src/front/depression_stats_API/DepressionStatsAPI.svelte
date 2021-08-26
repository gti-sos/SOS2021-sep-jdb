<script>

import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import Input from "sveltestrap/src/Input.svelte";
    import Label from "sveltestrap/src/Label.svelte";
    import FormGroup from "sveltestrap/src/FormGroup.svelte";

    import { Pagination, PaginationItem, PaginationLink } from "sveltestrap";

    let depression =[];
    let newDepression = { 
        country: "",
        year: "",
        depression_men: 0.0,
        depression_women: 0.0,
        depression_population: 0.0,

    };

    //======VARIABLES IDENTIFICADORES=====//

    let countries = [];
    let years = []; 
    
    //===========CamposVaciosParaLaBusqueda===========\\
    
    let actualCountry = "";
    let actualYear = "";

    //===========Paginacion===========\\
    let elementPage = 10;
    let offset = 0;
    let actualPage = 1;
    let moreData = true;

//===========MensajesDesactivados===========\\
    let okMsg = false;
    let errorMsg = false;
    
    onMount(getDepressionCountryYear);
    onMount(getDepression);
    

//=======================GET=======================\\
async function getDepressionCountryYear() {
    const res = await fetch("/api/v2/depression_stats");

    if (res.ok) {
            //===========Country===========\\
            const json = await res.json();
            countries = json.map((c) => {
                return c.country;
            });
            countries = Array.from(new Set(countries));

            //===========years===========\\
            years = json.map((c) => {
                return c.year;
            });
            years = Array.from(new Set(years));
        } else {
            console.log("ERROR");
        }
    }
    async function getDepression() {
        console.log("Fetching depression_stats...");
        const res = await fetch(
            "/api/v2/depression_stats?offset=" +
                elementPage * offset +
                "&limit=" +
                elementPage
        );
        const nextPage = await fetch(
            "/api/v2/depression_stats?offset=" +
                elementPage * (offset + 1) +
                "&limit=" +
                elementPage
        );
        if (res.ok && nextPage.ok) {
            console.log("Ok");
            const json = await res.json();
            const jsonNext = await nextPage.json();
            depression = json;
            if (jsonNext.length == 0) {
                moreData = false;
            } else {
                moreData = true;
            }
        } else {
            console.log("ERROR");
        }
    }
     //==============Metodo POST=======================\\
     async function insertDepression() {
        console.log(
            "Insertando depression_stats..." + JSON.stringify(newDepression)
        );
        if (
            isNaN(newDepression.year) ||
            isNaN(newDepression.depression_men) ||
            isNaN(newDepression.depression_women) ||
            isNaN(newDepression.depression_population) ||
            newDepression.country === "" ||
            newDepression.year === ""
        ) {
            console.log("Uno o más datos NO son numéricos");
            okMsg = false;
            errorMsg =
                "No puede introducir campos en blanco o campos que no sean numéricos";
        } else {
            const res = await fetch("/api/v2/depression_stats", {
                method: "POST",
                body: JSON.stringify(newDepression),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (res) {
                if (res.ok) {
                    getDepression();
                    okMsg = "Dato introducido de forma exitosa";
                    errorMsg = false;
                } else {
                    okMsg = false;
                    errorMsg =
                        "No puede introducirse un dato con mismo año y país debido a que ya existe uno en la base de datos";
                }
            });
        }
    }

     //================Metodo DELETE=======================\\
     async function deleteDepression(country, year) {
        const res = await fetch(
            "/api/v2/depression_stats/" + country + "/" + year,
            {
                method: "DELETE",
            }
        ).then(function (res) {
            getDepression();
            getDepressionCountryYear();
        });
        okMsg = "Dato borrado de forma exitosa";
        errorMsg = false;
    }

    async function deleteDepressionData() {
        const res = await fetch("/api/v2/depression_stats", {
            method: "DELETE",
        }).then(function (res) {
            getDepression();
            getDepressionCountryYear();
        });
        okMsg = "Todos los datos han sido borrados de forma exitosa";
        errorMsg = false;
    }
    //=======================LOADINITIALDATA=======================\\
    async function loadInitialDataDepression() {
        const res = await fetch("/api/v2/depression_stats/loadInitialData").then(
            function (res) {
                getDepression();
            }
        );
        okMsg = "Los datos iniciales han sido cargados de forma exitosa";
        errorMsg = false;
    }
      //=======================BUSQUEDA=======================\\

      async function searchDepression(country, year) {
        var url = "/api/v2/depression_stats";

        if (country != "" && year != "") {
            url = url + "?year=" + year + "&country=" + country;
        } else if (country != "" && year == "") {
            url = url + "?country=" + country;
        } else if (country == "" && year != "") {
            url = url + "?year=" + year;
        }

        const res = await fetch(url);

        if (res.ok) {
            const json = await res.json();
            depression = json;

            if (depression.length > 0) {
                okMsg = "Se ha encontrado uno o varios resultados";
                errorMsg = false;
            } else {
                okMsg = false;
                errorMsg = "No se ha obtenido ningún resultado";
            }
        } else {
            console.log("ERROR");
        }
    }
    async function addOffSet(inc) {
        offset += inc;
        actualPage += inc;
        getDepression();
    }
    //=======================FIN=======================\\
    </script>
    <main>
    {#await depression}
        Loading depression stats...
    {:then depression}
        <Button
            outline
            style="font-size: 16px;border-radius: 4px;background-color: white;"
            color="danger"
            on:click={searchDepression(actualCountry, actualYear)}
            class="button-search"
        >
            Buscar
        </Button>

        <FormGroup>
            <Label for="selectCountry">Búsqueda por país</Label>
            <Input
                name="selectCountry"
                id="selectCountry"
                bind:value={actualCountry}
            >
                {#each countries as country}
                    <option>{country}</option>
                {/each}
                <option>-</option>
            </Input>
        </FormGroup>




        <FormGroup>
            <Label for="selectYear">Búsqueda por año</Label>
            <Input name="selectYear" id="selectYear" bind:value={actualYear}>
                {#each years as year}
                    <option>{year}</option>
                {/each}
                <option>-</option>
            </Input>
        </FormGroup>
        <h6 style="color:rgb(187, 0, 0)">
            Atención: si intenta insertar los datos de un país que contenga más
            de una palabra, debe insertar una "_" en lugar de " ".
        </h6>
        <p style="color:rgb(6, 100, 6)">
            Por ejemplo: si quiere insertar los datos del país "Spain Murcia" debe
            poner "Spain_Murcia".
        </p>
        <Table bordered>
            <thead style="background:black;color:white;text-align:center;">
                <tr>
                    <th>País (Comund. Autónoma)</th>
                    <th>Año</th>
                    <th>Datos de Depresion por Hombre</th>
                    <th>Datos de Depresion por Mujer</th>
                    <th>Datos de Depresion en Población</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody style="background:white;color:black;text-align:center;">
                <tr>
                    <td>
                        <Input
                            type="text"
                            placeholder="Introduzca un país"
                            bind:value={newDepression.country}
                        /></td
                    >
                    <td>
                        <Input
                            type="number"
                            placeholder="Introduzca un año"
                            bind:value={newDepression.year}
                        /></td
                    >
                    <td>
                        <Input
                            type="number"
                            placeholder="Sólo caracteres numéricos"
                            step="1"
                            min="1.0"
                            bind:value={newDepression.depression_men}
                        />
                    </td>
                    <td>
                        <Input
                            type="number"
                            placeholder="Sólo caracteres numéricos"
                            step="1"
                            min="1.0"
                            bind:value={newDepression.depression_women}
                        /></td
                    >
                    <td>
                        <Input
                            type="number"
                            placeholder="Sólo caracteres numéricos"
                            step="1"
                            min="1.0"
                            bind:value={newDepression.depression_population}
                        /></td
                    >
                    <td>
                        <Button outline color="primary" on:click={insertDepression}>
                            Insertar
                        </Button>
                    </td>
                </tr>
                
                {#each depression as depressionStat}
                    <tr>
                        <td>
                            <a
                                href="#/depression_stats/{depressionStat.country}/{depressionStat.year}"
                            >
                                {depressionStat.country}
                            </a>
                        </td>
                        <td> {depressionStat.year} </td>
                        <td> {depressionStat.depression_men} </td>
                        <td> {depressionStat.depression_women} </td>
                        <td> {depressionStat.depression_population} </td>
                        <td>
                            <Button
                                outline
                                color="danger"
                                on:click={deleteDepression(
                                    depressionStat.country,
                                    depressionStat.year
                                )}
                            >
                                Borrar
                            </Button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </Table>
    {/await}





    <Pagination style="float:right;" ariaLabel="Cambio de página">
        <PaginationItem class={actualPage === 1 ? "disabled" : ""}>
            <PaginationLink
                previous
                href="#/depression_stats"
                on:click={() => addOffSet(-1)}
            />
        </PaginationItem>

        {#if actualPage != 1}
            <PaginationItem>
                <PaginationLink
                    href="#/depression_stats"
                    on:click={() => addOffSet(-1)}
                    >{actualPage - 1}</PaginationLink
                >
            </PaginationItem>
        {/if}
        <PaginationItem active>
            <PaginationLink href="#/depression_stats">{actualPage}</PaginationLink>
        </PaginationItem>

        {#if moreData}
            <PaginationItem>
                <PaginationLink href="#/depression_stats" on:click={() => addOffSet(1)}
                    >{actualPage + 1}</PaginationLink
                >
            </PaginationItem>
        {/if}

        <PaginationItem class={moreData ? "" : "disabled"}>
            <PaginationLink
                next
                href="#/depression_stats"
                on:click={() => addOffSet(1)}
            />
        </PaginationItem>
    </Pagination>
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    {#if okMsg}
        <p style="color: green">ÉXITO: {okMsg}</p>
    {/if}

    <Button
        style="font-size: 16px;border-radius: 4px;background-color: white;"
        outline
        color="secondary"
        on:click={pop}
    >
        Atrás
    </Button>
    <Button
        style="font-size: 16px;border-radius: 4px;background-color: white;"
        outline
        color="primary"
        on:click={loadInitialDataDepression}>Cargar datos iniciales</Button
    >
    <Button
        style="font-size: 16px;border-radius: 4px;background-color: white;"
        outline
        on:click={deleteDepressionData}
        color="danger"
    >
        Borrar todo
    </Button>
</main>

