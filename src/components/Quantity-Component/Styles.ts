import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 20,
    justifyContent: "space-between",
    width: "25%",
    height: 40,
  },
  button: {
    fontSize: 24,
    fontWeight: 'bold',
    borderRadius: 20,
    color: '#5b73ec',
  },
  quantity: {
    fontSize: 24,
    paddingHorizontal: 5,
    borderRadius: 20,
    color: '#5b73ec',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default styles;