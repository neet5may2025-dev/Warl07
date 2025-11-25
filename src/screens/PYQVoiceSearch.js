import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from "react-native";

import * as Speech from "expo-speech";
import * as SpeechRecognition from "expo-speech-recognition";

const GROQ_API_KEY = "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";

export default function PYQVoiceSearch() {
  const [recording, setRecording] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("Speak your PYQ question...");
  const [loading, setLoading] = useState(false);

  const startListening = async () => {
    setRecording(true);
    setQuestion("Listening...");

    try {
      const result = await SpeechRecognition.startAsync({
        continuous: false,
        language: "en-US"
      });

      setQuestion(result || "Couldn't catch your voice.");
      setRecording(false);
    } catch (e) {
      setQuestion("Voice recognition failed.");
      setRecording(false);
    }
  };

  const solveQuestion = async () => {
    if (!question) return;

    setLoading(true);
    setAnswer("Solving PYQ... ⏳");

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            {
              role: "system",
              content:
                "You are a NEET AI tutor. Solve this PYQ with final answer and short explanation."
            },
            {
              role: "user",
              content: question
            }
          ],
          temperature: 0.4
        })
      });

      const data = await res.json();
      const reply = data.choices[0]?.message?.content;

      setAnswer(reply || "No answer found.");
      Speech.speak(reply);
    } catch (err) {
      setAnswer("Error connecting AI.");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎤 PYQ Voice Search</Text>

      <TouchableOpacity
        style={styles.micButton}
        onPress={startListening}
        disabled={recording}
      >
        <Text style={styles.micText}>
          {recording ? "Listening..." : "🎙 Tap & Speak PYQ"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.questionLabel}>Detected Question:</Text>
      <Text style={styles.questionBox}>{question || "No voice input yet..."}</Text>

      <TouchableOpacity
        style={styles.solveButton}
        onPress={solveQuestion}
      >
        <Text style={styles.solveText}>Solve PYQ</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#22c55e" />}

      <ScrollView style={styles.answerBox}>
        <Text style={styles.answerText}>{answer}</Text>
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

  micButton: {
    backgroundColor: "#ef4444",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },

  micText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  },

  questionLabel: {
    color: "#94a3b8",
    marginBottom: 6
  },

  questionBox: {
    backgroundColor: "#1e293b",
    color: "#fff",
    padding: 10,
    borderRadius: 6,
    marginBottom: 12
  },

  solveButton: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    marginBottom: 15
  },

  solveText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold"
  },

  answerBox: {
    backgroundColor: "#0f172a",
    padding: 10,
    borderRadius: 8,
    flex: 1
  },

  answerText: {
    color: "#e2e8f0",
    fontSize: 14
  }
});