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

export default function EditCarro({ navigation, route }) {
  const {
    id,
    modelo: modeloParam,
    potencia: potenciaParam,
    categoria: categoriaParam,
    date: dateParam,
  } = route.params;

  const [modelo, setModelo] = useState(route.params.modelo);
  const [potencia, setPotencia] = useState(String(route.params.potencia));
  const [categoria, setCategoria] = useState(route.params.categoria);

  // Faz uma validação maluca pra tratar a data
  let initialDate;

  try {
    const rawDate = route.params?.date;

    if (rawDate?.toDate) {
      // Caso seja um Timestamp do Firestore
      initialDate = rawDate.toDate();
    } else if (typeof rawDate === "string" || typeof rawDate === "number") {
      // Caso seja uma string ou timestamp válido
      initialDate = new Date(rawDate);
    } else {
      throw new Error("Formato de data não reconhecido.");
    }

    // Verifica se a data é válida
    if (isNaN(initialDate.getTime())) {
      throw new Error("Data inválida gerada.");
    }
  } catch (err) {
    console.warn("Erro ao interpretar a data. Usando data atual.", err);
    initialDate = new Date();
  }

  const [date, setDate] = useState(initialDate);


  const [showDatePicker, setShowDatePicker] = useState(false);

  const validadeInputs = () => {
    if (!modelo.trim()) {
      Platform.OS === "web"
        ? window.alert("Informe o modelo")
        : Alert.alert("Erro", "Informe o modelo");
      return false;
    }

    if (potencia === undefined || potencia === null || potencia <= 0) {
      Platform.OS === "web"
        ? window.alert("Informe a potência")
        : Alert.alert("Erro", "Informe a potência");
      return false;
    }

    if (!categoria.trim()) {
      Alert.alert("Erro", "Informe a categoria do modelo");
      return false;
    }

    if (!date) {
      Alert.alert("Erro", "Informe a data de lançamento");
      return false;
    }

    return true;
  };

  const editCarro = () => {
    if (validadeInputs()) {
      const carDate = new Date(date);
      carDate.setHours(0, 0, 0, 0);

      database.collection("Carros").doc(id).update({
        modelo: modelo,
        potencia: parseInt(potencia),
        categoria: categoria,
        dataLancamento: carDate
      });

      navigation.navigate("DrawerRoutes", {
        screen: "Home",
      });
    }
  };

  const handleWebDateChange = (e) => {
    const [year, month, day] = e.target.value.split("-").map(Number);
    const newDate = new Date(year, month - 1, day);
    setDate(newDate);
  };

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
        placeholder="Informe o modelo"
      />

      <Text style={styles.label}>Potência</Text>

      <TextInput
        style={styles.inputText}
        value={potencia}
        onChangeText={setPotencia}
        placeholder="Informe a potência"
      />

      <Text style={styles.label}>Categoria</Text>

      <Picker
        style={styles.inputText}
        value={categoria}
        onValueChange={(itemValue) => setCategoria(itemValue)}
      >
        <Picker.Item label="Esportivo" value="Esportivo" />
        <Picker.Item label="SUV" value="SUV" />
        <Picker.Item label="Elétrico" value="Elétrico" />
        <Picker.Item label="Clássico" value="Clássico" />
      </Picker>

      <Text style={styles.label}>Data de Lançamento</Text>

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

      <TouchableOpacity style={styles.buttonNewTask} onPress={editCarro}>
        <FontAwesome name="edit" size={20} color={"#fff"} />
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Desenvolvido por Pedro Castro
        </Text>
      </View>
    </View>
  );
}
