/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea, Stack, SvgIconProps } from "@mui/material";
import { Button } from "@mui/material";

type NotificationCardProps = {
  logo: React.FC<SvgIconProps>;
  title: string;
  color: string;
  paragraph: string;
};
const NotificationCard = ({
  logo,
  title,
  color,
  paragraph,
}: NotificationCardProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <Box
          height="140"
          sx={{
            backgroundColor: color,
            height: "140px",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            textAlign: "center",
          }}
        >
          {logo}
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {paragraph}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Stack
        paddingX={2}
        paddingY={2}
        direction={"row"}
        gap={3}
        justifyContent={"center"}
      >
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ backgroundColor: color }}
          color="primary"
        >
          Add
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={[
            {
              backgroundColor: "white",
              color: color,
              border: `1px solid ${color}`,
            },
            () => ({
              "&:hover": {
                color: "white",
              },
            }),
          ]}
          color="primary"
        >
          Cancel
        </Button>
      </Stack>
    </Card>
  );
};

export default NotificationCard;
