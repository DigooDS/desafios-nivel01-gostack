import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data)
    })
  }, [])

  async function handleLikeRepository(id) {
    const like = await api.post(`repositories/${id}/like`)

    setRepositories(repositories.map(repository => repository.id === id ? like.data : repository))
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#32425c" />
      <SafeAreaView style={styles.container}>

        <FlatList
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({ item: repository }) => (

            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repository.title}</Text>

              <Text style={styles.techTitle}>Tecnologias utilizadas</Text>
              
              <View style={styles.techsContainer}>
                {repository.techs.map((tech) => (
                  <Text key={tech} style={styles.tech}>{tech}</Text>
                ))}
              </View>

              <Text style={styles.techTitle}>Link para github:</Text>

              <Text style={styles.textUrl}>{repository.url}</Text>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${repository.id}`}
                >
                  {repository.likes} curtidas
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#32425c",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  techTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5a5a5a",
    marginTop: 18,
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#A1395B",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  textUrl: {
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#325aa0",
    marginTop: 5,

  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#007ae6",
    padding: 12,
  },
});
