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

    <h1>Video sobre el proyecto</h1>

    <Container>

        <Col xs="auto">
            <Card class="mb-3">
                <CardHeader>
                    <CardTitle><h5>depression_stats</h5></CardTitle>
                </CardHeader>
                <CardBody>
                    <CardSubtitle />
                    <CardText
                        >Video Explicativo sobre depression_stats</CardText
                    >
                    <a href="https://www.youtube.com/watch?v=1mTH6A5bGv8">
                        <Button type="button" class="btn btn-info"
                            >Video Depression</Button
                        ></a
                    >
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
