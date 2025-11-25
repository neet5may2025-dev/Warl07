import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function ExplainScreen() {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState('');

  const explainNow = () => {
    setResult("Concept explanation will appear here in simple NEET language.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explain Topic</Text>

      <TextInput
        placeholder="Enter concept name..."
        style={styles.input}
        value={topic}
        onChangeText={setTopic}
      />

      <TouchableOpacity style={styles.button} onPress={explainNow}>
        <Text style={styles.btnText}>Explain</Text>
      </TouchableOpacity>

      {result !== "" && <Text style={styles.result}>{result}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#020617' },
  title: { fontSize: 22, color: '#22c55e', marginBottom: 15 },
  input: { backgroundColor: '#1e293b', padding: 10, borderRadius: 8, color: '#fff' },
  button: { backgroundColor: '#2563eb', padding: 12, marginTop: 15, borderRadius: 8 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  result: { color: '#e2e8f0', marginTop: 20 }
});