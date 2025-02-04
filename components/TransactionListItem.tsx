import { StyleSheet, Text, View } from "react-native";
import { Category, Transaction } from "../types";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import Card from "./ui/Card";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { categoryColors, categoryEmojies } from "../constants";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
interface TransactionListItemProps {
  transaction: Transaction;
  categoryInfo: Category | undefined;
  onDelete: (id: number) => Promise<void>;
}
export default function TransactionLisItem({
  transaction,
  categoryInfo,
  onDelete,
}: TransactionListItemProps) {
  const iconName =
    transaction.type === "Expense" ? "minuscircle" : "pluscircle";
  const color = transaction.type === "Expense" ? "red" : "green";
  const categoryColor = categoryColors[categoryInfo?.name || "Default"];
  const emoji = categoryEmojies[categoryInfo?.name || "Default"];

  // Render the delete button when swiped

  function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
    const styleAnimation = useAnimatedStyle(() => {
      console.log("showRightProgress:", prog.value);
      console.log("appliedTranslation:", drag.value);

      return {
        transform: [{ translateX: drag.value + 80 }],
      };
    });

    return (
      <Reanimated.View style={[styles.deleteButton, styleAnimation]}>
        {/* <Ionicons name="trash" size={32} color="red" /> */}
        <TouchableOpacity
          style={[styles.deleteButton, styleAnimation]}
          onPress={() => {
            onDelete(transaction.id);
            // onDelete(item.id)
          }}
        >
          <Ionicons name="trash" size={32} color="red" />
          {/* <Text style={styles.deleteText}>Delete</Text> */}
        </TouchableOpacity>
        {/* <Text style={styles.rightAction}>Text</Text> */}
      </Reanimated.View>
    );
  }
  return (
    <ReanimatedSwipeable
      containerStyle={styles.swipeable}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={RightAction}
    >
      {/* <Card> */}
      <View style={styles.row}>
        <View style={{ width: "40%", gap: 3 }}>
          <Amount
            amount={transaction.amount}
            color={color}
            iconName={iconName}
          />
          <CategoryItem
            categoryColor={categoryColor}
            categoryInfo={categoryInfo}
            emoji={emoji}
          />
        </View>
        <TransactionInfo
          date={transaction.date}
          description={transaction.description}
          id={transaction.id}
        />
      </View>
      {/* </Card> */}
    </ReanimatedSwipeable>
  );
}

function TransactionInfo({
  id,
  date,
  description,
}: {
  id: number;
  date: number;
  description: string;
}) {
  return (
    <View style={{ flexGrow: 1, gap: 6, flexShrink: 1 }}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{description}</Text>
      <Text>Transaction Number {id}</Text>
      <Text style={{ fontSize: 12, color: "gray" }}>
        {new Date(date + 1000).toDateString()}
      </Text>
    </View>
  );
}
function CategoryItem({
  categoryColor,
  categoryInfo,
  emoji,
}: {
  categoryColor: string;
  categoryInfo: Category | undefined;
  emoji: string;
}) {
  return (
    <View
      style={[
        styles.categoryContainer,
        { backgroundColor: categoryColor + "40" },
      ]}
    >
      <Text style={styles.categoryText}>
        {emoji} {categoryInfo?.name}
      </Text>
    </View>
  );
}

function Amount({
  iconName,
  color,
  amount,
}: {
  iconName: "minuscircle" | "pluscircle";
  color: string;
  amount: number;
}) {
  return (
    <View style={styles.row}>
      <AntDesign name={iconName} color={color} size={18} />
      <AutoSizeText
        fontSize={32}
        mode={ResizeTextMode.max_lines}
        numberOfLines={1}
        style={[styles.amount, { maxWidth: "80%" }]}
      >
        ${amount}
      </AutoSizeText>
    </View>
  );
}
const styles = StyleSheet.create({
  amount: {
    fontSize: 32,
    fontWeight: "800",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  categoryContainer: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  categoryText: {
    fontSize: 12,
  },

  item: {
    backgroundColor: "#fff",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
  },
  deleteButton: {
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
    backgroundColor: "papayawhip",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },

  rightAction: { width: 50, height: 50, backgroundColor: "purple" },
  separator: {
    width: "100%",
    borderTopWidth: 1,
  },
  swipeable: {
    backgroundColor: "#ffff",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    // borderRadius: 15,
    // height: 50,
    // backgroundColor: "papayawhip",
    // alignItems: "center",
  },
});
