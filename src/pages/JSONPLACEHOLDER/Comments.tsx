import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Icon,
  Typography,
} from "@mui/material";
import { CardContainer } from "../../components";
import { CommentResponse } from "../../interfaces/JsonPlaceholderApi/Comments";
import { Paths } from "../../router/routes";
import { useGetApi } from "../../hooks";
import { useGetComments } from "../../api/JsonPlacecholder";

export default () => {
  const limit = 12;
  const [offset, setOffset] = useState(0);
  const commentsData = useGetApi<CommentResponse[]>(
    () => useGetComments(`/comments?_start=${offset}&_limit=${limit}`),
    {
      manual: true,
      refetching: offset,
    }
  );

  return (
    <CardContainer md={8} lg={6} title="JSONPlaceholder API Comentarios">
      <>
        {commentsData.data.length === 0 && (
          <>
            <Box textAlign="center">
              <Button onClick={commentsData.doRequest}>
                Solicitar comentarios
              </Button>
            </Box>
            <Box
              minHeight={"40vh"}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography>Caja de comentarios vacia.</Typography>
            </Box>
          </>
        )}
      </>

      <Box textAlign="center">
        {commentsData.error && (
          <Typography>Se produjo un error en la petición.</Typography>
        )}

        {commentsData.loading && (
          <>
            <CircularProgress sx={{ alignSelf: "center" }} />
            <Typography>Recuperando datos del usuario...</Typography>
          </>
        )}

        {commentsData.data.length > 0 && (
          <Grid container spacing={2} p={4}>
            {commentsData.data.map((comment, i) => (
              <Grid key={comment.id + i} item xs={12} md={4} lg={3}>
                <Card sx={{ boxShadow: 3, height: 160, maxHeight: 160 }}>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      ID {comment.id}
                    </Typography>

                    <Typography
                      sx={{ mb: 1.5 }}
                      fontWeight="bold"
                      height={20}
                      overflow="hidden"
                      variant="subtitle1"
                    >
                      {comment.name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      height={60}
                      overflow="hidden"
                    >
                      {comment.body}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            <Grid item xs={12} mt={2} mb={-5}>
              <Box display="flex" justifyContent="space-evenly" mb={4}>
                <Button
                  size="small"
                  disabled={offset < limit}
                  onClick={() => setOffset(offset - limit)}
                >
                  <Icon>arrow_back_ios</Icon>
                </Button>

                <Button
                  disabled={commentsData.lastRequestIsEmpty}
                  size="small"
                  onClick={() => setOffset(offset + limit)}
                >
                  <Icon>arrow_forward_ios</Icon>
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>

      <Divider sx={{ mx: 4 }} />

      <Box textAlign="center" my={4}>
        <NavLink to={Paths.INDEX}>
          <Button size="small" color="secondary">
            Regresar al Inicio
          </Button>
        </NavLink>
      </Box>
    </CardContainer>
  );
};