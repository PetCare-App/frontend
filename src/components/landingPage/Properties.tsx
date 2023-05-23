import { Box, Container, styled, Typography } from "@mui/material";
import React from "react";
import House from "./House";
import house1 from "../../assets/image1.png";
import house2 from "../../assets/image2.png";
import house3 from "../../assets/image3.png";

interface Property {
  id: string;
  img: string;
  price: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  space: number;
}

const Properties: React.FC = () => {
  const properties: Property[] = [
    {
      id: "1",
      img: house1,
      price: "35000",
      address: "8502 Preston Rd. Inglewood, Maine 98280",
      bedrooms: 2,
      bathrooms: 2,
      space: 2000,
    },
    {
      id: "2",
      img: house2,
      price: "38000",
      address: "Wailuku, HI 96793",
      bedrooms: 3,
      bathrooms: 2,
      space: 2300,
    },
    {
      id: "3",
      img: house3,
      price: "47000",
      address: "2917 23rd St",
      bedrooms: 4,
      bathrooms: 3,
      space: 3000,
    },
  ];

  const PropertiesBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const PropertiesTextBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  }));

  return (
    <Box sx={{ mt: 5, backgroundColor: "#F5FAFE", py: 10 }}>
      <Container>
        <PropertiesTextBox>
          <Typography
            sx={{ color: "#000339", fontSize: "35px", fontWeight: "bold" }}
          >
            Featured Properties
          </Typography>
          <Typography sx={{ color: "#5A6473", fontSize: "16px", mt: 1 }}>
            Everything you need to know when looking for a new home!
          </Typography>
        </PropertiesTextBox>

        <PropertiesBox>
          {properties.map((property) => (
            <House
              key={property.id}
              img={property.img}
              price={property.price}
              address={property.address}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              space={property.space}
            />
          ))}
        </PropertiesBox>
      </Container>
    </Box>
  );
};

export default Properties;