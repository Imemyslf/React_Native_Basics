// import { StatusBar } from "expo-status-bar";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import DATA from "../types/goalItemModule";
import GoalInput from "./component/GoalInput";
import GoalItem from "./component/GoalItem";

export default function Index() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [courseGoals, setCourseGoals] = useState<DATA[]>([]);

  const addGoalHandler = (enteredtext: string) => {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredtext, id: Math.random().toString() },
    ]);
  };

  const deleteGoalHandler = (id: string) => {
    setCourseGoals((currentCourseGoal) => {
      return currentCourseGoal.filter((goal) => goal.id !== id);
    });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button title="Add a new Goal" color="#5e0acc" onPress={toggleModal} />
        {showModal && (
          <GoalInput
            visible={showModal}
            onPress={addGoalHandler}
            showModal={toggleModal}
          />
        )}
        <View style={styles.goalContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  data={itemData.item}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, idx) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a",
  },
  goalContainer: {
    flex: 6,
  },
});
