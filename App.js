import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";

function App({
  data = [
    { id: 1, name: "hardik" },
    { id: 2, name: "poudel" },
    { id: 3, name: "from" },
    { id: 4, name: "kalanki" },
  ],
}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchTerm) {
      const searchText = searchTerm.toLowerCase();
      setFilteredData(
        data.filter((d) => d.name.toLowerCase().includes(searchText))
      );
    } else {
      setFilteredData(data);
    }
  }, [searchTerm]);

  const handleSelect = (item) => {
    console.log("selectedItem", selectedItems);
    setSelectedItems((current) =>
      current.find((f) => f.id === item.id)
        ? selectedItems.filter((selected) => selected.id !== item.id)
        : [...current, item]
    );
  };

  const handleClear = () => {
    setSearchTerm("");
    inputRef.current.clear();
  };

  return (
    <View>
      <View style={{ flexDirection: "row", margin: 10 }}>
        <TextInput
          ref={inputRef}
          onChangeText={setSearchTerm}
          value={searchTerm}
          style={{ borderWidth: 1, width: 200, height: 25 }}
        />
        <TouchableOpacity
          onPress={handleClear}
          style={{
            backgroundColor: "skyblue",
            paddingHorizontal: 5,
            justifyContent: "center",
            borderRadius: 4,
            marginLeft: 6,
          }}
        >
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: 30 }}>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const itemSelected = selectedItems.some(
              (selected) => selected.id === item.id
            );
            return (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                activeOpacity={0.75}
                style={{
                  marginTop: 6,
                  borderWidth: 1,
                  borderColor: itemSelected ? "orange" : "black",
                  alignSelf: "flex-start",
                  alignItems: "center",
                  width: 100,
                  borderRadius: itemSelected ? 20 : 4,
                }}
              >
                <Text>{item.name}</Text>
                <Text>{itemSelected ? "Selected" : "Select"}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}

export default App;
