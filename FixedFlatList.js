The issue stems from the timing of `onLayout` and updates to the `FlatList`.  The `FlatList` often re-renders, causing multiple `onLayout` calls.  To fix this, only update the state when necessary.  Consider using `useLayoutEffect` for more reliable measurements after all subviews have rendered.

Here's an example using `useLayoutEffect` and a more controlled state update:

```javascript
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const FixedFlatList = () => {
  const [itemHeights, setItemHeights] = useState({});

  useLayoutEffect(() => {
    // Update only when layout changes after all subviews have rendered
    //This is done via useLayoutEffect and not useEffect
  }, []);

  const renderItem = ({ item, index }) => {
    const measureItem = (event) => {
      setItemHeights((prevHeights) => ({ ...prevHeights, [index]: event.nativeEvent.layout.height }));
    };

    return (
      <View style={styles.item} onLayout={measureItem}>
        <Text>{item.text}</Text>
      </View>
    );
  };

  // Sample data
  const data = [{ text: 'Item 1' }, { text: 'Item 2' }, { text: 'Item 3' }];

  return (
    <FlatList data={data} renderItem={renderItem} keyExtractor={(item, index) => index} />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default FixedFlatList;
```