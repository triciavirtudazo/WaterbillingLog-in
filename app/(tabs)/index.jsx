import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, FlatList, ScrollView, Alert, StyleSheet 
} from 'react-native';

const App = () => {
  const [products, setProducts] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newStock, setNewStock] = useState('');

  const addProduct = () => {
    if (!newName || !newPrice || !newStock) {
      Alert.alert('Error', 'Please enter product name, price, and stock quantity.');
      return;
    }
    const newProduct = { 
      id: Date.now(), 
      name: newName, 
      price: `$${newPrice}`, 
      stock: parseInt(newStock), 
      sold: false 
    };
    setProducts([...products, newProduct]);
    setNewName('');
    setNewPrice('');
    setNewStock('');
  };

  const markAsSold = (productId) => {
    setProducts(products.map((item) => 
      item.id === productId && item.stock > 0 
        ? { ...item, stock: item.stock - 1 } 
        : item
    ));
    Alert.alert('Success', 'Product marked as sold.');
  };

  const removeProduct = (productId) => {
    setProducts(products.filter(item => item.id !== productId));
    Alert.alert('Removed', 'Product has been removed.');
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.inventoryTitle}>🏬 Department Store Inventory</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={newName}
          onChangeText={setNewName}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric"
          value={newPrice}
          onChangeText={setNewPrice}
        />
        <TextInput
          style={styles.input}
          placeholder="Stock Quantity"
          keyboardType="numeric"
          value={newStock}
          onChangeText={setNewStock}
        />
        <TouchableOpacity style={styles.addButton} onPress={addProduct}>
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
            <Text style={styles.productStock}>Stock: {item.stock}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.soldButton, item.stock === 0 && styles.disabledButton]} 
                onPress={() => item.stock > 0 && markAsSold(item.id)}
                disabled={item.stock === 0}
              >
                <Text style={styles.buttonText}>Sell</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeProduct(item.id)}>
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  inventoryTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 15, color: '#333' },
  inputContainer: { marginBottom: 20, padding: 10, backgroundColor: '#fff', borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  input: { height: 45, borderColor: '#ddd', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 8, backgroundColor: '#fff' },
  addButton: { backgroundColor: '#007bff', padding: 12, borderRadius: 8, alignItems: 'center' },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  productCard: { backgroundColor: '#fff', padding: 15, marginBottom: 15, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  productName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  productPrice: { fontSize: 16, color: '#666', marginBottom: 5 },
  productStock: { fontSize: 16, color: '#444', marginBottom: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  soldButton: { backgroundColor: '#28a745', padding: 8, borderRadius: 5, flex: 1, marginRight: 5, alignItems: 'center' },
  removeButton: { backgroundColor: '#dc3545', padding: 8, borderRadius: 5, flex: 1, alignItems: 'center' },
  disabledButton: { backgroundColor: '#ccc' },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
});

export default App;