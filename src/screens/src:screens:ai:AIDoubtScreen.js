import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';

// Requires: expo install expo-av expo-speech react-native-voice
import Voice from '@react-native-voice/voice';

const GROQ_API_KEY = "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";

export default function AIDoubtScreen() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("Ask any NEET doubt by typing or speaking...");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  React.useEffect(() => {
    Voice.onSpeechResults = (e) => {
      if (e.value && e.value.length > 0) {
        setQuestion(e.value[0]);
      }
    };

    returning();

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const returning = async () => {
    try {
      await Voice.stop();
    } catch {}
  };

  const startListening = async () => {
    try {
      if (listening) return;
      setListening(true);
      await Voice.start("en-IN");
    } catch (e) {
      alert("Microphone permission needed.");
      setListening(false);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setListening(false);
    } catch {}
  };

  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("Thinking... 🧠");

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
            { role: "system", content: "You are a strict and clear NEET Biology, Physics, Chemistry teacher." },
            { role: "user", content: question }
          ],
          temperature: 0.6
        })
      });

      const data = await response.json();
      const reply = data.choices[0].message.content;

      setAnswer(reply);

      // AI SPEAKS THE ANSWER 🔊
      Speech.speak(reply, {
        rate: 0.9,
        pitch: 1.0,
        language: "en-IN"
      });

    } catch (error) {
      setAnswer("Error connecting to AI. Check internet.");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Doubt Solver 🎤</Text>

      <TextInput
        style={styles.input}
        placeholder="Type or speak your doubt..."
        placeholderTextColor="#94a3b8"
        value={question}
        onChangeText={setQuestion}
        multiline
      />

      <TouchableOpacity 
        style={styles.micButton}
        onPress={listening ? stopListening : startListening}
      >
        <Text style={styles.btnText}>{listening ? "Stop 🎤" : "Speak 🎙️"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={askAI}>
        <Text style={styles.btnText}>{loading ? "Thinking..." : "Ask AI"}</Text>
      </TouchableOpacity>

      <ScrollView style={styles.answerBox}>
        <Text style={styles.answer}>{answer}</Text>
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
    marginBottom: 10,
    minHeight: 80
  },

  micButton: {
    backgroundColor: '#9333ea',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },

  button: {
    backgroundColor: '#2563eb',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15
  },

  btnText: {
    color: "#fff",
    fontWeight: 'bold',
    textAlign: 'center'
  },

  answerBox: {
    backgroundColor: '#0f172a',
    padding: 10,
    borderRadius: 8,
    flex: 1
  },

  answer: {
    color: '#e2e8f0'
  }
});