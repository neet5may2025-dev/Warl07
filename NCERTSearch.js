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

export default function NCERTSearch() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("Enter any NCERT topic or line for explanation...");
  const [loading, setLoading] = useState(false);

  const explainNCERT = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setResult("Explaining from NCERT... 📚");

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
              content: "You are a NEET teacher. Explain NCERT content in simple language with examples, formulas and exam points."
            },
            {
              role: "user",
              content: topic
            }
          ],
          temperature: 0.5
        })
      });

      const data = await response.json();
      const reply = data.choices[0]?.message?.content;

      setResult(reply || "No explanation generated.");
    } catch (error) {
      setResult("Error connecting to AI. Please check internet.");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NCERT Smart Explainer 📖</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter NCERT topic / line (e.g., Dark Reaction, DNA Replication)..."
        placeholderTextColor="#94a3b8"
        value={topic}
        onChangeText={setTopic}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={explainNCERT}>
        <Text style={styles.btnText}>
          {loading ? "Explaining..." : "Explain from NCERT"}
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
    marginBottom: 12,
    minHeight: 80
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