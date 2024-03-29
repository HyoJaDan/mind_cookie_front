import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";
import PictureImage from "../../../assets/icon/photo.svg";
import PlusIcon from "../../../assets/icon/plus";
import { todayPersonalChallenge } from "../../../data/personalChallenge/personalChallengeData";
import { postMealGoal } from "../../../data/personalChallenge/personalChallengeDataHandler";
import { userDataInMyRecord, userId } from "../../../data/user/userData";
import { DefaultButton } from "../../../uitll/defaultButton";
import { Commonstyles } from "../../../uitll/defaultStyle";
import { MealButton } from "../../../uitll/mealButton";

type AppNavigationParamList = {
  MyGoalScreen: undefined;
};

export default function MealDetailScreen({ route }: { route: any }) {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppNavigationParamList>>();
  const { index } = route.params;
  const [data, setData] = useRecoilState(todayPersonalChallenge);
  const setMember = useSetRecoilState(userDataInMyRecord);
  const item = data.challenge.mealRecords[index];

  const [content, setContent] = useState(item.content);
  const [calorie, setCalorie] = useState<number>(item.calorie);
  const [image, setImage] = useState<string | null>(item.imageUrl);
  const [imageURI, setImageURI] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const handleInputCalorieChange = (text: string) => {
    // 숫자만 입력 받기 위한 정규식 검사
    const validatedText = text.replace(/[^0-9]/g, "");
    setCalorie(parseInt(validatedText, 10));
  };
  const MemberId = useRecoilValue(userId);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1,
      });
    if (!result.canceled) {
      const uri = result.assets && result.assets[0].uri;
      if (uri) {
        setImage(uri);
        setImageURI(uri);
      } else {
        console.error("Image URI is undefined.");
      }
    }
  };

  const uploadImage = async (uri: string) => {
    const formData = new FormData();
    formData.append("calorie", calorie);
    formData.append("content", content);
    formData.append("title", item.title);
    formData.append("type", item.type);
    formData.append("createdTime", new Date().toISOString());

    formData.append("boardFile", {
      uri,
      type: "image/jpeg",
      name: "upload.jpg",
    });
    const updatedMealRecords = [...data.challenge.mealRecords];
    updatedMealRecords[index] = {
      ...updatedMealRecords[index],
      calorie,
      content,
      imageUrl: uri,
    };
    const updatedData = {
      ...data,
      challenge: {
        ...data.challenge,
        mealRecords: updatedMealRecords,
      },
    };

    setData(updatedData);
    setMember((prevUserData) => ({
      ...prevUserData,
      intakedCalorie: prevUserData.intakedCalorie + calorie,
    }));

    await postMealGoal(formData, MemberId);
    navigation.navigate("MyGoalScreen");
  };

  const submitHandler = () => {
    uploadImage(imageURI);
  };
  return (
    <ScrollView contentContainerStyle={{}} showsVerticalScrollIndicator={false}>
      <View style={styles.Wrapper}>
        <Text style={[fontStyle.BD16, { color: "#191B23" }]}>
          오늘의 식사 기록
        </Text>
        <View style={styles.Picture}>
          <Pressable style={styles.Picture} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <PictureImage width={36} height={36} />
            )}
          </Pressable>
        </View>
        <View style={Commonstyles.flexGap}>
          <MealButton
            type={item.type}
            title={item.title}
            backgroundColor={Colors.basic.white}
          />
          <Pressable onPress={() => setIsButtonClicked(!isButtonClicked)}>
            <View style={[Commonstyles.flexGap, styles.button]}>
              <PlusIcon fill={"#C2C2C2"} />
              <Text>칼로리</Text>
            </View>
          </Pressable>
        </View>
        {isButtonClicked && (
          <View style={Commonstyles.flexRow}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={calorie.toString()}
              onChangeText={handleInputCalorieChange}
              placeholder="숫자만 입력하세요"
            />
            <Text>kcal</Text>
          </View>
        )}
        <View
          style={[Commonstyles.line, { borderColor: Colors.basic.white }]}
        />
        <View style={styles.textContainer}>
          <TextInput
            style={[styles.inputText]}
            onChangeText={setContent}
            value={content}
            multiline
            placeholder="공유 하고싶은 이야기가 있나요?"
          />
        </View>
        <View
          style={[Commonstyles.line, { borderColor: Colors.basic.white }]}
        />
        <DefaultButton pressHandler={submitHandler} text="저장하기" />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  Wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 24,
  },
  Picture: {
    height: 257,
    borderRadius: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.basic.white,
  },
  image: { width: "100%", height: "100%", borderRadius: 20 },
  button: {
    backgroundColor: Colors.basic.white,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 40,
  },
  input: {
    height: 48,
    width: 80,
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: Colors.basic.white,
    borderWidth: 1,
    borderColor: Colors.grayscale.gray300,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    height: 200,
    width: "100%", // 화면 너비에 맞춤
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: Colors.basic.white,
    borderColor: Colors.grayscale.gray300,
  },
});
