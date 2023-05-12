import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Styles';

export default function QuantityComponent() {
  const [quantity, setQuantity] = useState(0);

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decreaseQuantity}>
        <Text style={styles.button}>{'<'}</Text>
      </TouchableOpacity>

      <Text style={styles.quantity}>{quantity}</Text>

      <TouchableOpacity onPress={increaseQuantity}>
        <Text style={styles.button}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
}
