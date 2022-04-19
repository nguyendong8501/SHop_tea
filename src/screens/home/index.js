import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, PureComponent } from "react";
import {
  FlatList,
  ScrollView,
  StatusBar,
  Image,
  Text,
  View,
} from "react-native";

import DrinkItem from "../../components/DrinkItem";
import data from "../../data/drinks.json";
import data1 from "../../data/drinks_like.json";
import styles from "./styles";

export default function HomeScreen({ navigation }) {
  const [user, setuser] = useState(null);
  const renderItem = ({ item, index }) => {
    return <DrinkItem item={item} index={index} navigation={navigation} />;
  };
  const getUserData = async () => {
    let curUser = await AsyncStorage.getItem("curUser");
    curUser = JSON.parse(curUser);
    setuser(curUser);
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <ScrollView
      style={{
        backgroundColor: "#fff",
        paddingHorizontal: 12,
        marginTop: StatusBar.currentHeight + 10,
      }}
    >
      <Text style={{ marginTop: 20, fontSize: 22 }}>{`Chào, ${
        user && user.name
      }!`}</Text>
      <View>
        <Image
          style={{ height: 200, width: 340 }}
          source={require("../../../assets/banner.jpg")}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Đồ uống HOT</Text>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={true}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Có thể bạn sẽ thích</Text>

        {/* <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={true}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
        /> */}
        <FlatList
          data={data}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={true}
          numColumns={2}
          keyExtractor={(item, index) => item + index}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Có thể bạn sẽ thích</Text>
        <FlatList
          data={data1}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
        />
      </View>
    </ScrollView>
  );
}
