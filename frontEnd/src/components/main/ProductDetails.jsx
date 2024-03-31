/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";

const ProductDetails = ({ clickProduct }) => {
  const [selectImg, setSelectImg] = useState(0);

  // eslint-disable-next-line no-unused-vars
  const [alignment, setAlignment] = useState("left");

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <>
      <Box>
        <img
          style={{ borderRadius: 12 }}
          width={400}
          height={400}
          src={clickProduct.attributes.image.data[selectImg].attributes.url}
          alt=""
        />
      </Box>
      <Box>
        <Typography variant="h5" fontWeight={600} letterSpacing={1}>
          {clickProduct.attributes.title}
        </Typography>
        <Typography
          my={1.5}
          fontSize={"22px"}
          color={"crimson"}
          variant="h5"
          fontWeight={600}
        >
          ${clickProduct.attributes.price}
        </Typography>
        <Typography variant="body1">
          {clickProduct.attributes.description}
        </Typography>
        <Stack>
          <ToggleButtonGroup
            sx={{
              ".Mui-selected": {
                border: "1px solid #29B6F6 !important",
                opacity: "1",
                borderRadius: 2,
              },
              my: 4,
              gap: 2,
              flexWrap: "wrap",
              alignItems: "center",
            }}
            value={selectImg}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            {clickProduct.attributes.image.data.map((item, index) => {
              return (
                <ToggleButton
                  key={item.id}
                  value={index}
                  aria-label="left aligned"
                  sx={{
                    width: "110px",
                    height: "110px",
                    p: "0",
                    opacity: "0.5",
                    border: "none",
                  }}
                >
                  <img
                    onClick={() => {
                      setSelectImg(index);
                    }}
                    src={item.attributes.url}
                    style={{
                      borderRadius: 8,
                      cursor: "pointer",
                      ":hover": { scale: "1.1", width: 400 },
                    }}
                    width={"100%"}
                    height={"100%"}
                    alt=""
                  />
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Stack>
        <Button
          //   onClick={handleOpen}
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
          By Now
        </Button>
      </Box>
    </>
  );
};

export default ProductDetails;
