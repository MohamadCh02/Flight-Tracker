import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Flight(props) {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.flightNubmer}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
    width: 300,
    padding: 20,
    marginVertical: 10,
  },
  flightNubmer: {
    color: 'red',
    textAlign: 'center',
  },
});
