import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';

const GROQ_API_KEY = "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";

export default function PYQSearch() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("Search any NEET PYQ by topic or keyword...");
  const [loading, setLoading] = useState(false);

  const searchPYQ = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResult("Searching PYQs and analyzing... 🔍");

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "mixtral-8x7b-32768",
          messages: [
            {
              role: "system",
              content: "You are a NEET expert. When given a topic, give 5 previous year NEET questions with answers and short explanations."
            },
            {
              role: "user",
              content: query
            }
          ],
          temperature: 0.5
        })
      });

      const data = await response.json();
      const reply = data.choices[0]?.message?.content;

      setResult(reply || "No PYQs found.");
    } catch (error) {
      setResult("Error connecting to AI. Please check your internet.");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PYQ Smart Search 🔍</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter topic (e.g., Photosynthesis, Human Heart)..."
        placeholderTextColor="#94a3b8"
        value={query}
        onChangeText={setQuery}
      />

      <TouchableOpacity style={styles.button} onPress={searchPYQ}>
        <Text style={styles.btnText}>
          {loading ? "Searching..." : "Search PYQs"}
        </Text>
      </TouchableOpacity>

      <ScrollView style={styles.resultBox}>
        <Text style={styles.resultText}>{result}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    padding: 20
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#22c55e',
    marginBottom: 15
  },

  input: {
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    marginBottom: 12
  },

  button: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  resultBox: {
    backgroundColor: '#0f172a',
    padding: 10,
    borderRadius: 8,
    flex: 1
  },

  resultText: {
    color: '#e2e8f0'
  }
});