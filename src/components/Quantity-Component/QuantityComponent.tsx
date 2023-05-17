import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';

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
        <Icon name="minus" size={24} style={styles.quantity} />
      </TouchableOpacity>

      <Text style={styles.quantity}>{quantity}</Text>

      <TouchableOpacity onPress={increaseQuantity}>
        <Icon name="plus" size={24} style={styles.quantity} />
      </TouchableOpacity>
    </View>
  );
}
