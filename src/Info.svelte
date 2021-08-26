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
    <Nav class="navbar navbar-expand-lg navbar-light bg-info">
        <NavItem>
            <NavLink lass="nav-link " href="/">Volver a la página principal</NavLink>
        </NavItem>

        <NavItem>
            <NavLink lass="nav-link" href="/#/integrations">Integraciones</NavLink>
        </NavItem>

    
    </Nav>

    <h1>SOS2021-SEP-JDB</h1>

    <h2>Desarrollador</h2>
    <Container>
        <Col>
            <a href="http://github.com/jdblanco">Juan Diez Blanco</a>
        </Col>
    </Container>
    <p />
    <Container>
        <Row>
            <Col>
                <a href="https://github.com/gti-sos/SOS2021-sep-jdb.git">
                    <Button color="info">GitHub </Button></a
                >
            </Col>
        </Row>
    </Container>
    <p />
    <h2>APIs</h2>
    <Container>
       
        <Col xs="auto">
            <Card class="mb-3">
                <CardHeader>
                    <CardTitle><h5>depression_stats</h5></CardTitle>
                </CardHeader>
                <CardBody>
                    <CardSubtitle />
                    <CardText
                        >Estadísticas acerca de los datos recogidos por depresion
                        en las comunidades autónomas de España.</CardText
                    >
                    <a
                        href="https://sos2021-sep-jdb.herokuapp.com/api/v2/depression_stats"
                    >
                        <Button color="info">API </Button></a
                    >
                    <a href="/#/depression_stats">
                        <Button color="info">Interfaz de Depresion</Button>
                    </a>
                    <a
                    href="https://documenter.getpostman.com/view/14948118/TzzGHZBZ"
                    ><Button color="info">Documentación </Button></a
                >
                </CardBody>
                <CardFooter
                    >realizado por
                    <a href="https://github.com/jdblanco"
                        >Juan Diez Blanco</a
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
