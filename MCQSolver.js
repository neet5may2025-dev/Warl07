import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const GROQ_API_KEY = "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";

export default function MCQSolver() {
  const [image, setImage] = useState(null);
  const [solution, setSolution] = useState("Upload a photo of your MCQ to solve it.");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Gallery permission is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.7
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const solveMCQ = async () => {
    if (!image) {
      alert("Please upload MCQ image first.");
      return;
    }

    setLoading(true);
    setSolution("Reading & solving your question...");

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.2-90b-vision-preview",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: "Read this NEET MCQ and solve it with explanation." },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/jpeg;base64,${image.base64}`
                  }
                }
              ]
            }
          ]
        })
      });

      const data = await response.json();
      const reply = data.choices[0]?.message?.content;

      setSolution(reply || "No response received from AI.");
    } catch (error) {
      setSolution("Error solving MCQ. Check internet or API.");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>NEET MCQ Photo Solver 📸</Text>

      <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
        <Text style={styles.btnText}>Upload MCQ Image</Text>
      </TouchableOpacity>

      {image && (
        <Image source={{ uri: image.uri }} style={styles.preview} />
      )}

      <TouchableOpacity style={styles.solveBtn} onPress={solveMCQ}>
        <Text style={styles.btnText}>
          {loading ? "Solving..." : "Solve MCQ"}
        </Text>
      </TouchableOpacity>

      <ScrollView style={styles.solutionBox}>
        <Text style={styles.solution}>{solution}</Text>
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
    color: "#22c55e",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10
  },

  uploadBtn: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10
  },

  solveBtn: {
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  },

  preview: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginVertical: 10,
    borderRadius: 10
  },

  solutionBox: {
    backgroundColor: "#0f172a",
    padding: 10,
    borderRadius: 8,
    flex: 1
  },

  solution: {
    color: "#e2e8f0"
  }
});