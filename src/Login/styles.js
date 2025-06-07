import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 28,
    marginBottom: 20,
    color: "#0D0D0D",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D4AF37",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  erro: {
    color: "red",
    marginBottom: 10,
    fontSize: 12,
  },
  botao: {
    backgroundColor: "#D4AF37",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBotao: {
    color: "#0D0D0D",
    fontWeight: "bold",
  },
});

export default styles;
