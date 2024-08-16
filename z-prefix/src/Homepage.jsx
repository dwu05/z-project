import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { Box, Text } from '@chakra-ui/react';
const apiPort = 'http://localhost:5080';



export const Homepage = () => {
  const [inventory, setInventory] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${apiPort}item/`);
      const data = await response.json();
      setInventory(data.map(item => ({
        id: item.item_id,
        seller: item.userId,
        name: item.itemName,
        description: item.description,
        quantity: item.quantity,
      })))
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    fetchItems();
  }, []);


  return (
    <>
      <h1>Avengers Inventory</h1>
      <div>
        {inventory.map((item) => (
            <Box key={item.id}>
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>Quantity: {item.quantity}</Text>
            </Box>
          // <Link key={item.id} to={`/ItemDetails/${item.id}`}>
          // </Link>
        ))}
      </div>
    </>
  )
}