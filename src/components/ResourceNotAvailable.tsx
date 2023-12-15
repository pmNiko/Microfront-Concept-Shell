import { NavLink } from "react-router-dom";
import { Box, Button, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { CardContainer } from ".";
import { Routes } from "../router";

const ResourceNotAvailable = () => {
  return (
    <CardContainer
      md={8}
      minHeight=""
      height="65vh"
      showImage
      title="El recurso se encuentra en manatenimiento"
    >
      <Box mx={6}>
        <Typography mx={2} mb={1} fontWeight="bold" variant="subtitle2">
          Por favor intente nuevamente más tarde o comuniquese con el soporte.
        </Typography>
        <Divider />
      </Box>

      <Box mt={4} mb={2} mx={2} display="flex" justifyContent="space-evenly">
        <Button color="secondary" onClick={() => window.location.reload()}>
          Recargar
        </Button>

        <NavLink to={Routes.index.routerPath}>
          <Button>Ir al inicio</Button>
        </NavLink>
      </Box>
    </CardContainer>
  );
};

export default ResourceNotAvailable;
