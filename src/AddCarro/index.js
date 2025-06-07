//Importações de componentes e firebase
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import database from "../../config/firebase_config";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./styles";

//Função principal do New Task
export default function NewTask({ navigation }) {
  //Variáveis a serem manipuladas
  const [modelo, setModelo] = useState("");
  const [potencia, setPotencia] = useState("");
  const [categoria, setCategoria] = useState("Esportivo");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  //Função definir formato de data DD/MM/AAAA
  useEffect(() => {
    setDate(new Date());
  }, []);

  //Função para validar os inputs
  const validateInputs = () => {
    if (!modelo.trim()) {
      Platform.OS === "web"
        ? window.alert("Informe um modelo")
        : Alert.alert("Erro", "Informe um modelo");
      return false;
    }

    if (potencia === undefined || potencia === null || potencia <= 0) {
      Alert.alert("Erro", "Informe a potência do veículo!");
      return false;
    }

    if (!categoria.trim()) {
      Alert.alert("Erro", "Informe a categoria do veículo!");
      return false;
    }

    if (!date) {
      Alert.alert("Erro", "Informe a data da tarefa!");
      return false;
    }

    return true;
  };

  //Função para adicionar carros ao projeto
  const addCarro = () => {
    if (validateInputs()) {
      const carDate = new Date(date);
      carDate.setHours(0, 0, 0, 0);

      database.collection("Carros").add({
        modelo: modelo,
        potencia: potencia,
        categoria: categoria,
        date: carDate,
        estoque: false
      });

      navigation.navigate("Home");
    }
  };

  //Função para adicionar data (web)
  const handleWebDateChange = (e) => {
    const [year, month, day] = e.target.value.split("-").map(Number);
    const newDate = new Date(year, month - 1, day);
    setDate(newDate);
  };

  //Função para adicionar data (mobile)
  const onDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }

    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Modelo</Text>

      <TextInput
        style={styles.inputText}
        value={modelo}
        onChangeText={setModelo}
        placeholder="Informe o modelo de seu veículo"
      />

      <Text style={styles.label}>Potência</Text>

      <TextInput
        style={styles.inputText}
        value={potencia}
        onChangeText={setPotencia}
        placeholder="Informe a potência de seu veículo"
      />

      <Text style={styles.label}>Categoria</Text>

      <Picker
        style={styles.inputText}
        value={categoria}
        onValueChange={(itemValue) => setPriority(itemValue)}
      >
        <Picker.Item label="Esportivo" value="Esportivo" />
        <Picker.Item label="SUV" value="SUV" />
        <Picker.Item label="Elétrico" value="Elétrico" />
        <Picker.Item label="Clássico" value="Clássico" />
      </Picker>

      <Text style={styles.label}>Data de lançamento</Text>

      {/*Verifica se é Mobile para exibir o DatePicker */}

      {Platform.OS === "web" ? (
        <input
          type="date"
          value={date.toISOString().split("T")[0]}
          onChange={handleWebDateChange}
          onKeyDown={(e) => e.preventDefault()}
          style={{
            width: "90%",
            marginTop: 10,
            padding: 10,
            height: 50,
            borderBottomWidth: 1,
            borderBottomColor: "#D4AF37",
            border: "none",
            borderBottom: "1px solid #D4AF37",
            outline: "none",
            fontSize: 16,
            boxSizing: "border-box",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      ) : (
        <>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={{
              ...styles.inputText,
              justifyContent: "center",
              paddingHorizontal: 10,
            }}
          >
            <Text>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </>
      )}

      <TouchableOpacity style={styles.buttonNewTask} onPress={addCarro}>
        <FontAwesome name="save" size={20} color="#FFF" />
      </TouchableOpacity>

      {/*Rodapé da página */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Desenvolvido por Pedro Castro
        </Text>
      </View>
    </View>
  );
}
