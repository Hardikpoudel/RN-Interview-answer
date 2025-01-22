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
    { id: 4, name: "kalanki" }
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
      <TextInput
        ref={inputRef}
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      <TouchableOpacity onPress={handleClear}>
        <Text>Clear</Text>
      </TouchableOpacity>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelect(item)}>
            <Text>{item.name}</Text>
            <Text>
              {selectedItems.some((selected) => selected.id === item.id)
                ? "Selected"
                : "Not selected"}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default App;
