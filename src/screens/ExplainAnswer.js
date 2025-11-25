import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";

const GROQ_API_KEY = "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";

export default function ExplainAnswer() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [explanation, setExplanation] = useState("Enter question + answer and tap Explain...");
  const [loading, setLoading] = useState(false);

  const explain = async () => {
    if (!question || !answer) return;

    setLoading(true);
    setExplanation("Thinking like your NEET teacher... 🧠");

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
              content:
                "You are an expert NEET teacher. Explain answers with concept, logic, tricks, NCERT reference and common mistakes."
            },
            {
              role: "user",
              content: `
Question: ${question}
Correct Answer: ${answer}
Explain fully in simple NEET style.
`
            }
          ],
          temperature: 0.4
        })
      });

      const data = await response.json();
      const reply = data.choices[0]?.message?.content;

      setExplanation(reply || "No explanation generated.");
    } catch (error) {
      setExplanation("Error connecting to AI. Please check internet.");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Explanation 🧠</Text>

      <TextInput
        style={styles.input}
        placeholder="Paste MCQ / PYQ question here..."
        placeholderTextColor="#64748b"
        value={question}
        onChangeText={setQuestion}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Enter correct answer..."
        placeholderTextColor="#64748b"
        value={answer}
        onChangeText={setAnswer}
      />

      <TouchableOpacity style={styles.button} onPress={explain}>
        <Text style={styles.btnText}>
          {loading ? "Explaining..." : "Explain Answer"}
        </Text>
      </TouchableOpacity>

      <ScrollView style={styles.outputBox}>
        <Text style={styles.outputText}>{explanation}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    padding: 15
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#22c55e",
    marginBottom: 12
  },

  input: {
    backgroundColor: "#1e293b",
    borderRadius: 8,
    padding: 12,
    color: "#f1f5f9",
    marginBottom: 10,
    minHeight: 60
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  },

  outputBox: {
    backgroundColor: "#0f172a",
    padding: 10,
    borderRadius: 8,
    flex: 1
  },

  outputText: {
    color: "#e2e8f0",
    fontSize: 14
  }
});