//Importações dos componentes e do Firebase
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Switch,
  Alert,
  FlatList,
} from "react-native";
import database from "../../config/firebase_config";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./styles";
import { Picker } from "@react-native-picker/picker";

export default function Home({ navigation }) {
  const [carro, setCarro] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [CarroToDelete, setCarroToDelete] = useState(null);
  const [hideEstoque, setHideEstoque] = useState(false);
  const [filteredCarro, setFilteredCarro] = useState([]);
  const [sortOption, setSortOption] = useState("categoria");
  const [searchText, setSearchText] = useState("");

  //Função para alterar o estoque dos carros
  function toggleCarroStatus(id, currentStatus) {
    database.collection("Carros").doc(id).update({
      estoque: !currentStatus,
    });
  }

  //Função para confirmar a exclusão do carro
  function confirmDelete(id) {
    setCarroToDelete(id);
    setShowDeleteModal(true);
  }

  //Função para excluir carro
  function deleteCarro() {
    if (CarroToDelete) {
      database.collection("Carros").doc(CarroToDelete).delete();
      setCarro((prevCarro) =>
        prevCarro.filter((carro) => carro.id !== CarroToDelete),
      );
      setShowDeleteModal(false);
    }
  }

  //Função para cancelar a exclusão do carro
  function cancelDelete() {
    setShowDeleteModal(false);
  }

  //Função para formatar data
  function formatDate(dateString) {
    const date = dateString instanceof Date ? dateString : new Date(dateString.toDate ? dateString.toDate() : dateString);
    return date.toISOString().split("T")[0].split("-").reverse().join("/");
  }

  //Função para cor do modelo dos carros
  function getCategoriaColor(categoria) {
    switch (categoria) {
      case "Esportivo":
        return "#8B0000";
      case "SUV":
        return "#003B46";
      case "Elétrico":
        return "#2C5F2D";
      case "Clássico":
        return "#C9A13D";
      default:
        return "#000";
    }
  }

  //Função para comparar e classificar os carros
  function compareCarros(a, b) {
    if (sortOption === "dataLancamento") {
      const dateA = new Date(a.dataLancamento.toDate ? a.dataLancamento.toDate() : a.dataLancamento);
      const dateB = new Date(b.dataLancamento.toDate ? b.dataLancamento.toDate() : b.dataLancamento);

      return dateA - dateB;
    } else if (sortOption === "categoria") {
      const categoriaOrder = {
        Esportivo: 1,
        SUV:       2,
        Elétrico:  3,
        Classíco:  4,
      };
      return (
        (categoriaOrder[a.categoria] || 5) - (categoriaOrder[b.categoria] || 5)
      );
    }
    return 0;
  }

  //Função para contagem de likes
  function handleLike(id, currentLikes) {
    database.collection("Carros").doc(id).update({likes: (currentLikes || 0) + 1,});
  }

  //Função para contagem de dislikes
  function handleDislike(id, currentDislikes) {
    database.collection("Carros").doc(id).update({dislikes: (currentDislikes || 0) + 1,});
  }

  //UseEffect para buscar os carros filtrados
  useEffect(() => {
    const filtered = carro.filter((t) => {const matchStatus = hideEstoque ? !t.estoque : true;
      const matchSearch = t.modelo.toLowerCase().includes(searchText.toLowerCase());
      return matchStatus && matchSearch;
    });
    const sorted = [...filtered].sort(compareCarros);
    setFilteredCarro(sorted);
  }, [carro, hideEstoque, searchText, sortOption]);

  //Função para buscar informações no Firebase
  useEffect(() => {
    const unsubscribe = database.collection("Carros").onSnapshot((QuerySnapshot) => {
        const list = [];
        QuerySnapshot.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });
        setCarro(list);
      });
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Ocultar carros fora de estoque*/}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 15,
          marginBottom: 10,
          paddingRight: 10,
        }}
      >
        <Switch
          value={hideEstoque}
          onValueChange={setHideEstoque}
          thumbColor={hideEstoque ? "#4caf50" : "#ef5350"}
          trackColor={hideEstoque ? "#4caf50" : "#ef5350"}
        />
        <Text style={{ marginLeft: 10 }}>Ocultar carros fora de estoque</Text>
      </View>

      {/* Definir buscar por data ou categoria */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 15,
          marginBottom: 10,
          paddingRight: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", marginRight: 10 }}>
          Ordenar por:
        </Text>
        <Picker
          selectedValue={sortOption}
          onValueChange={(itemValue) => setSortOption(itemValue)}
          mode="dropdown"
          style={{ width: 150, fontSize: 18 }}
        >
          <Picker.Item label="Data Lançamento" value="dataLancamento" />
          <Picker.Item label="Categoria" value="categoria" />
        </Picker>
      </View>

      {/* Definir a busca de carros pelo modelo */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
          borderRadius: 8,
          marginHorizontal: 10,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
      >
        <FontAwesome name="search" size={18} color="#000" />

        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          placeholder="Pesquise um modelo"
        />
      </View>

      {/*Exibição dos carros */}
      <FlatList
        data={filteredCarro}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.contextAllTasks}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Text
                  style={[
                    styles.descriptionTask,
                    item.estoque && {
                      textDecorationLine: "line-through",
                      color: "#000",
                    },
                  ]}
                >
                  {item.modelo}
                </Text>

                <Text
                  style={[
                    styles.descriptionTask,
                    item.estoque && {
                      textDecorationLine: "line-through",
                      color: "#000",
                    },
                  ]}
                >
                  {item.potencia}
                </Text>

                <Text
                  style={{
                    backgroundColor: getCategoriaColor(item.categoria),
                    color: "#fff",
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 4,
                  }}
                >
                  {item.categoria}
                </Text>

                <Text style={{ color: "#000" }}>
                  {item.dataLancamento ? formatDate(item.dataLancamento) : ""}
                </Text>
              </View>
            </View>

            {/*Botões para manipulação */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  marginRight: 10,
                  alignItems: "center",
                }}
                onPress={() => handleLike(item.id, item.likes)}
              >
                <FontAwesome name="thumbs-up" size={20} color={"#007bff"} />
                <Text
                  style={{
                    fontSize: 12,
                    marginLeft: 2,
                  }}
                >
                  {item.likes || 0}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  marginRight: 10,
                  alignItems: "center",
                }}
                onPress={() => handleDislike(item.id, item.dislikes)}
              >
                <FontAwesome name="thumbs-down" size={20} color={"#ff0000"} />
                <Text
                  style={{
                    fontSize: 12,
                    marginLeft: 2,
                  }}
                >
                  {item.dislikes || 0}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() => toggleCarroStatus(item.id, item.estoque)}
              >
                <FontAwesome
                  name={item.estoque ? "undo" : "check"}
                  size={20}
                  color={item.estoque ? "#ff9100" : "#35b30e"}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() =>
                  navigation.navigate("Edit Task", {
                    id: item.id,
                    modelo: item.modelo,
                    categoria: item.categoria,
                    date: item.date,
                  })
                }
              >
                <FontAwesome name={"edit"} size={20} color={"#590868"} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                <FontAwesome name={"trash"} size={20} color={"#c41616"} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/*Botão para incluir carro */}
      <TouchableOpacity
        style={styles.buttonNewTask}
        onPress={() => navigation.navigate("New Task")}
      >
        <FontAwesome name={"plus"} size={20} color={"#0D0D0D"} />
      </TouchableOpacity>

      {/*Modal para excluir carro */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        onRequestClose={cancelDelete}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Tem certeza que deseja excluir este carro?</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#c41616" }]}
                onPress={cancelDelete}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#35b30e" }]}
                onPress={deleteCarro}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/*Rodapé da página */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Desenvolvido por Pedro Castro
        </Text>
      </View>
    </View>
  );
}
