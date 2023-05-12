import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    justifyContent: 'flex-end',
    borderRadius: 20,
    height: 50,
    width: 100,
    alignSelf: 'center',
    marginRight: 2,
  },
  button: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    color: '#FFFFFF',
  },
  quantity: {
    fontSize: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#EFEFEF',
    borderRadius: 20,
    color: '#333333',
    textAlign: 'center',
    minWidth: 30,
    fontWeight: 'bold',
  }
});

export default styles;