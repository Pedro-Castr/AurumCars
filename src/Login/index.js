import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from "react-native";
import styles from "./styles";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailValido, setEmailValido] = useState(false);
  const [senhaValida, setSenhaValida] = useState(false);

  const validarEmail = (texto) => {
    setEmail(texto);
    const regex = /^[^\s@]+@[^\s@]+\.(com|com\.br)$/;
    setEmailValido(regex.test(texto));
  };

  const validarSenha = (texto) => {
    setSenha(texto);
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    setSenhaValida(regex.test(texto));
  };

  const handleLogin = () => {
    const emailPermitido = "aurumcars@gmail.com";
    const senhaPermitida = "senha123";

    if (email === emailPermitido && senha === senhaPermitida) {
      navigation.navigate("DrawerRoutes");
    } else {
      Platform.OS === "web" ? window.alert("Email ou Senha inválidos") : Alert.alert("Erro", "Email ou Senha inválidos");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={validarEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      {!emailValido && email.length > 0 && (
        <Text style={styles.erro}>E-mail inválido</Text>
      )}

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={validarSenha}
        secureTextEntry
        style={styles.input}
      />
      {!senhaValida && senha.length > 0 && (
        <Text style={styles.erro}>
          A senha deve conter letras, números e no mínimo 8 caracteres
        </Text>
      )}

      <TouchableOpacity
        style={[
          styles.botao,
          !(emailValido && senhaValida) && { backgroundColor: "#ccc" },
        ]}
        onPress={handleLogin}
        disabled={!(emailValido && senhaValida)}
      >
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
