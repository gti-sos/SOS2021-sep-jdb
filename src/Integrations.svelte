<script>
    import {
        Button,
        Card,
        CardBody,
        CardFooter,
        CardHeader,
        CardSubtitle,
        CardText,
        CardTitle,
        Col,
        Container,
        Nav,
        NavItem,
        NavLink,
        Row,
    } from "sveltestrap";
</script>

<main>
    <Nav>
        <NavItem>
            <NavLink href="/">Volver a la página principal</NavLink>
        </NavItem>

        <NavItem>
            <NavLink href="/#/info">Info</NavLink>
        </NavItem>

      
        <NavItem>
            <NavLink href="/#/integrations">Integraciones</NavLink>
        </NavItem>

        <NavItem>
            <NavLink href="/#/about">Vídeos</NavLink>
        </NavItem>
    </Nav>

    <h1>Integraciones</h1>

    <Container>

        <Col xs="auto">
            <Card class="mb-3">
                <CardHeader>
                    <CardTitle><h5>depression_stats</h5></CardTitle>
                </CardHeader>
                <CardBody>
                    <CardSubtitle />
                    <CardText
                        > Gráficos base de depression_svelte</CardText
                    >
                    <a href="/#/analytics/depression_stats_chart">
                        <Button type="button" class="btn btn-info">Depression_1</Button></a
                    >
                   
                </CardBody>
                <CardFooter
                    
                    >
                    </CardFooter
                >
            </Card>
        </Col>
        <Col xs="auto">
            <Card class="mb-3">
                <CardHeader>
                    <CardTitle><h5>Integrations</h5></CardTitle>
                </CardHeader>
                <CardBody>
                    <CardSubtitle />
                    <CardText
                        >Integraciones con otras api</CardText
                    >
                    
                    <a href="/#/integrations/children_out">
                        <Button type="button" class="btn btn-success">Niños</Button></a
                    >
                    <a href="/#/integrations/suicides">
                        <Button type="button" class="btn btn-success">Suicidios</Button></a
                    >
                    <a href="/#/integrations/obesity">
                        <Button type="button" class="btn btn-success">Obesidad</Button></a
                    >
                    <a href="/#/integrations/futbol">
                        <Button type="button" class="btn btn-warning">Futbol</Button></a
                    >
                    <a href="/#/integrations/bad">
                        <Button type="button" class="btn btn-warning">Breaking bad</Button></a>
                </CardBody>
                <CardFooter
                    >realizado por
                    <a href="https://github.com/jdblanco">Juan Diez Blanco</a
                    ></CardFooter
                >
            </Card>
        </Col>
        
    </Container>
</main>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }
    h1 {
        color: #0d497e;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
