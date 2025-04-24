import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";
import FlashMessage from "react-native-flash-message";

import TestDiaryCardScreen from "./TestDiaryCardScreen";

// import { useEffect, useState } from "react";
// import {
//   addEntry,
//   getAllEntries,
//   initDB,
//   updateEntry,
// } from "./src/db/diary-db";
// import { DiaryEntry } from "./src/types/types";

// import AppNavigation from "./src/navigation/Navigation";

// import { test } from "./test";

// const App = () => {
//   useEffect(() => {
//     initDB()
//       .then(() => {
//         console.log("Database initialized");
//       })
//       .catch((error) => {
//         console.error("Error initializing database:", error);
//       });
//   });
//   return (
//     <>
//       <IconRegistry icons={EvaIconsPack} />
//       <ApplicationProvider
//         {...eva}
//         theme={eva.light}
//         customMapping={{ ...eva.mapping }}
//       >
//         <SafeAreaProvider>
//           {/* <View style={styles.container}>
//             <Text style={styles.title}>Welcome to Startrail Diary!</Text>
//             <Text style={styles.subtitle}>Start writing your thoughts today.</Text>
//           </View> */}
//           <AppNavigation />
//           {__DEV__ && ( // 仅在开发模式下显示按钮
//             <View>
//               <Button title="Run Test Script" onPress={test} />
//             </View>
//           )}
//         </SafeAreaProvider>
//         <FlashMessage position="top" />
//       </ApplicationProvider>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f5f5f5",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//   },
// });

// export default App;

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={eva.light}
        customMapping={{ ...eva.mapping }}
      >
        <SafeAreaProvider>
          {/* <View style={styles.container}>
            <Text style={styles.title}>Welcome to Startrail Diary!</Text>
            <Text style={styles.subtitle}>Start writing your thoughts today.</Text>
          </View> */}
          <TestDiaryCardScreen />
        </SafeAreaProvider>
        <FlashMessage position="top" />
      </ApplicationProvider>
    </>
  );
};

export default App;
