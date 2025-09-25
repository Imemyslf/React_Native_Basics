// import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import GoalInput from "./component/GoalInput";
import GoalItem from "./component/GoalItem";
import DATA from "./module/goalItemModule";

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
      <View style={styles.appContainer}>
        <Button title="Add a new Goal" onPress={toggleModal} />
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
  },
  goalContainer: {
    flex: 6,
  },
});
