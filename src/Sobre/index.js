// src/Sobre/index.js
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import styles from "./styles";

export default function Sobre() {
  const [logradouro, setLogradouro] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [cep, setCep] = useState("");
  const [uf, setUf] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://viacep.com.br/ws/36883212/json/")
      .then((response) => response.json())
      .then((data) => {
        setCep(data.cep);
        setLogradouro(data.logradouro);
        setLocalidade(data.localidade);
        setUf(data.uf);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar o endereço:", error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>História da Marca</Text>
        <Text style={styles.paragraph}>
          A AurumCars foi fundada há mais de uma década por <Text style={styles.label}>Pedro Castro</Text>, um visionário apaixonado pelo mundo automotivo que acreditava que carros eram mais do que máquinas, eram parte da identidade de quem os dirigia. Com esse propósito, ele criou a marca com o objetivo de oferecer soluções que unissem tecnologia e cuidado com cada veículo, sempre prezando pela qualidade e pela confiança.
        </Text>

        <Text style={styles.paragraph}>
          Inspirado por essa trajetória, desenvolvi este site com o intuito de manter vivo o legado da AurumCars. Mais do que uma simples plataforma, ele foi criado para organizar, gerenciar e valorizar cada carro cadastrado, com a atenção e o respeito que a marca sempre defendeu. Essa é a minha homenagem à história que Pedro começou — e que continua acelerando rumo ao futuro.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Sobre o Autor</Text>
        <View style={styles.infoList}>
          <Text style={styles.item}><Text style={styles.label}>Nome:</Text> Pedro Castro</Text>
          <Text style={styles.item}><Text style={styles.label}>Telefone:</Text> (11) 91234-5678</Text>
          <Text style={styles.item}><Text style={styles.label}>E-mail:</Text> pedrocastro@email.com</Text>
          {loading ? (
            <ActivityIndicator size="small" color="#D4AF37" />
          ) : (
            <><Text style={styles.item}>
                <Text style={styles.label}>Endereço:</Text> {logradouro}, {localidade}/{uf}
              </Text><Text style={styles.item}>
                  <Text style={styles.label}>CEP:</Text> {cep}
                </Text></>
          )}
        </View>
      </View>
    </View>
  );
}
