import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Icon,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { ButtonBackHome, CardContainer } from "../../components";
import { TodoResponse } from "../../interfaces/JsonPlaceholderApi/Todos";

import { useEffect, useState } from "react";
import { useGetTodos } from "../../api/JsonPlacecholder";
import { useGetApi } from "../../hooks";
import { avatars } from "./avatarImages";

export default () => {
  const dataLoader = useLoaderData() as TodoResponse[];
  const [todos, setTodos] = useState(dataLoader);
  const { data, doRequest, loading, error } = useGetApi(useGetTodos, {
    manual: true,
  });

  const handleClick = (id: number) =>
    setTodos([...todos.filter((t) => t.id !== id)]);

  useEffect(() => {
    data.length > 0 && setTodos(data);
  }, [data]);

  return (
    <CardContainer lg={3} title="JSONPlaceholder API Tareas">
      <Box mx="auto">
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
          }}
        >
          {todos.length === 0 && (
            <>
              <Typography variant="caption">
                No hay cargadas para mostrar.
              </Typography>
              <Box textAlign="center" mt={4}>
                <Button size="small" onClick={doRequest}>
                  Solicitar tareas
                </Button>
              </Box>
              {loading && <CircularProgress sx={{ alignSelf: "center" }} />}
              {error && (
                <Typography>Se produjo un error en la petición.</Typography>
              )}
            </>
          )}

          {todos.map((todo, i) => (
            <Box key={todo.id + i}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={avatars[i + 1]} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography>
                      {todo.completed ? (
                        <Icon color="success" fontSize="small">
                          done
                        </Icon>
                      ) : (
                        <Icon fontSize="small"> check_box_outline_blank</Icon>
                      )}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography
                        sx={{ ml: 1, display: "inline" }}
                        variant="caption"
                        color="text.secondary"
                      >
                        Prioridad {todo.id}
                      </Typography>
                      <Typography pl={1} fontSize={"0.9em"}>
                        {todo.title}
                      </Typography>
                    </>
                  }
                />
                <Button
                  sx={{ pt: 2, pr: -2 }}
                  onClick={() => handleClick(todo.id)}
                >
                  <Icon fontSize="small" color="error">
                    delete
                  </Icon>
                </Button>
              </ListItem>
              <Divider variant="inset" component="li" />
            </Box>
          ))}
        </List>
      </Box>

      <Box mb={4} textAlign="center">
        <ButtonBackHome />
      </Box>
    </CardContainer>
  );
};
