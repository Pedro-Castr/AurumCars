import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  //Estilo principal
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  //Label dos inputs
  label: {
    width: "90%",
    marginTop: 20,
    fontSize: 16,
    marginLeft: 20,
    color: "#D4AF37",
    marginLeft: "auto",
    marginRight: "auto",
  },
  //Campo de input do texto
  inputText: {
    width: "90%",
    marginTop: 10,
    padding: 10,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#D4AF37",
    marginLeft: "auto",
    marginRight: "auto",
  },
  //Botão para incluir nova tarefa (botão flutuante)
  buttonNewTask: {
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 50,
    left: 20,
    backgroundColor: "#D4AF37",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  //Estilo do ícone de inclusão
  iconButton: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  //Rodapé da página
  footer: {
    backgroundColor: "#D4AF37",
    padding: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "flex-start",
    paddingLeft: 15,
  },
  //Texto do rodapé
  footerText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "left",
  },
});

export default styles;
