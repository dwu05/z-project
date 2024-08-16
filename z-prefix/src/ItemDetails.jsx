import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Box, Text, Heading } from '@chakra-ui/react';

const apiPort = 'http://localhost:5080/'

export const ItemDetails = () => {
  const [itemDetails, setItemDetails] = useState([]);
  const { id } = useParams();

  const fetchItemDetails = async () => {
    try {
      const response = await fetch(`${apiPort}item/${id}`);
      const data = await response.json();
      setItemDetails(data.map(item => ({
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
    fetchItemDetails();
  }, [id]);


  return (
    <>
      <div>
        {itemDetails.map((item) => (
          <Box key={item.id}>
            <Heading>{item.name}</Heading>
            <Text>{item.description}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Seller ID: {item.seller}</Text>
          </Box>
        ))}
      </div>
    </>
  )
}