/* eslint-disable react/no-unescaped-entities */
import { useTheme } from "@emotion/react";
import {
  Box,
  Container,
  Rating,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import CircularProgress from "@mui/material/CircularProgress";

import { useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

// import mainCardImg1 from "../images/mainCard/2.jpg";

import { useGetProductByNameQuery } from "../../redux/Product";

import { AnimatePresence, motion } from "framer-motion";
import ProductDetails from "./ProductDetails";

const style = {
  position: "absolute",
  bgcolor: "background.paper",
  boxShadow: 24,
  px: 4,
  py: { xs: 8, md: 5.5 },
  width: "80%",
  minWidth: { xs: "90%", md: 900 },
  border: "1px solid #29B6F6",
  borderRadius: 3,
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  gap: 5,
  animation: "movepopup 0.77s 1",
  "@keyframes movepopup": {
    "0%": {
      transform: "scale(0)",
    },
    "50%": {
      transform: "scale(1.1)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
};

const Main = () => {
  const theme = useTheme();

  const [alignment, setAlignment] = useState("left");

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const allProducts = "products?populate=*";
  const menCategory = "products?populate=*&filters[category][$eq]=MEN";
  const womenCategory = "products?populate=*&filters[category][$eq]=WOMEN";

  const [myData, setMyData] = useState(allProducts);

  const { data, error, isLoading } = useGetProductByNameQuery(myData);

  const [clickProduct, setClickProduct] = useState({});

  if (error) {
    return (
      <Container sx={{ textAlign: "center", py: 5, color: "red" }}>
        <Typography variant="h6">{error.error}</Typography>
        <Typography variant="h6">Please Try Again Later</Typography>
      </Container>
    );
  }
  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center", py: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (data) {
    return (
      <Container>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          gap={4}
        >
          <Box>
            <Typography fontWeight={500} variant="h5">
              Selected Product
            </Typography>
            <Typography fontWeight={300} variant="body1">
              All Our New Arrivals in a exclusive Brand Selection
            </Typography>
          </Box>
          <ToggleButtonGroup
            color="info"
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            sx={{
              ".Mui-selected": {
                border: "1px solid #29B6F6 !important",
                color: "#29B6F6",
                background: "initial",
              },
              gap: 3,
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ToggleButton
              sx={{ color: theme.palette.text.primary }}
              className="myButton"
              value="left"
              aria-label="left aligned"
              onClick={() => {
                setMyData(allProducts);
              }}
            >
              All Category
            </ToggleButton>
            <ToggleButton
              sx={{ color: theme.palette.text.primary }}
              className="myButton"
              value="center"
              aria-label="centered"
              onClick={() => {
                setMyData(menCategory);
              }}
            >
              Men Category
            </ToggleButton>
            <ToggleButton
              sx={{ color: theme.palette.text.primary }}
              className="myButton"
              value="right"
              aria-label="right aligned"
              onClick={() => {
                setMyData(womenCategory);
              }}
            >
              Women Category
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          gap={7}
        >
          <AnimatePresence>
            {data.data.map((item) => {
              return (
                <Card
                  key={item.id}
                  sx={{
                    maxWidth: 345,
                    mt: 7,
                    flexGrow: 1,
                    "&:hover .MuiCardMedia-root": {
                      scale: "1.05",
                      transition: ".6s",
                    },
                  }}
                  component={motion.section}
                  layout
                  initial={{ transform: "scale(0)" }}
                  animate={{ transform: "scale(1)" }}
                  transition={{ type: "spring", damping: 10, stiffness: 50 }}
                >
                  <CardMedia
                    sx={{ height: 250 }}
                    image={`${item.attributes.image.data[0].attributes.url}`}
                    title="green iguana"
                  />
                  <CardContent>
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Typography variant="h6" gutterBottom component="div">
                        {item.attributes.title}
                      </Typography>
                      <Typography variant="subtitle1" component="p">
                        $ {item.attributes.price}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {item.attributes.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between" }}>
                    <Button
                      onClick={() => {
                        handleOpen();
                        setClickProduct(item);
                      }}
                      sx={{
                        border: "1px solid #29B6F6 !important",
                        background: "#29B6F6 !important",
                        color: "#fff",
                        textTransform: "capitalize",
                        transition: "0.5s",
                        "&:hover": {
                          border: "1px solid #29B6F6 !important",
                          color: "#29B6F6",
                          bgcolor: "transparent !important",
                        },
                      }}
                      size="large"
                    >
                      <AddShoppingCartIcon fontSize="small" sx={{ mr: 1 }} />
                      Add To Cart
                    </Button>
                    <Rating
                      precision={0.5}
                      name="read-only"
                      value={item.attributes.rating}
                      readOnly
                    />
                  </CardActions>
                </Card>
              );
            })}
          </AnimatePresence>
        </Stack>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <IconButton
                sx={{
                  position: "absolute",
                  right: 15,
                  top: 10,
                  "&:hover": {
                    transition: ".5s",
                    rotate: "180deg",
                    color: "#dc143c",
                  },
                }}
                onClick={handleClose}
              >
                <CloseRoundedIcon />
              </IconButton>
              <ProductDetails clickProduct={clickProduct} />
            </Box>
          </Fade>
        </Modal>
      </Container>
    );
  }
};

export default Main;
