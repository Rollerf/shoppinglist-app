import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Item from '../../models/Item';

interface QuantityComponentProps {
  item: Item;
  decreaseQuantity: (item: Item) => void;
  increaseQuantity: (item: Item) => void;
}

export default function QuantityComponent(props: QuantityComponentProps) {
  const handleQuantityDecrease = () => {
    props.decreaseQuantity(props.item);
  };

  const handleQuantityIncrease = () => {
    props.increaseQuantity(props.item);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleQuantityDecrease}>
        <Icon name="minus" size={24} style={styles.quantity} />
      </TouchableOpacity>

      <Text style={styles.quantity}>{props.item.quantity}</Text>

      <TouchableOpacity onPress={handleQuantityIncrease}>
        <Icon name="plus" size={24} style={styles.quantity} />
      </TouchableOpacity>
    </View>
  );
}
