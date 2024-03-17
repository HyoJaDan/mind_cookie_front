import axios from "axios";
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
import { Colors } from "../../../assets/color/color";
import { fontStyle } from "../../../assets/font/font";
import CoocieIcon from "../../../assets/icon/challenge/cookie.svg";
import FoodIcon from "../../../assets/icon/challenge/noodles.svg";
import PictureImage from "../../../assets/icon/photo.svg";
import PlusIcon from "../../../assets/icon/plus.svg";
import { MealOrSnack } from "../../../components/challenge/myGoal/MealGoal";
import { DefaultButton } from "../../../uitll/defaultButton";
import { Commonstyles } from "../../../uitll/defaultStyle";

export default function MealDetailScreen({ route }: { route: any }) {
  const { item }: { item: MealOrSnack } = route.params;
  const [image, setImage] = useState<string | null>(item.imageUrl);
  const [text, setText] = useState("");

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [calorie, setCalorie] = useState<number>(0);
  const handleInputCalorieChange = (text: any) => {
    // 숫자만 입력 받기 위한 정규식 검사
    const validatedText = text.replace(/[^0-9]/g, "");
    setCalorie(validatedText);
  };
  const numberMatch = item.title.match(/\d+/);
  const number = numberMatch ? numberMatch[0] : "";

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          console.log("이미지 권한이 필요합니다.");
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
        quality: 1,
      });

    if (!("canceled" in result) || !result.canceled) {
      const successResult = result as ImagePicker.ImagePickerSuccessResult;
      setImage(successResult.assets[0].uri);
      //uploadImage(successResult.uri);
    }
  };

  const uploadImage = async (uri: string) => {
    const formData = new FormData();
    formData.append("file", {
      uri,
      type: "image/jpeg", // or your file type
      name: "upload.jpg", // or your file name
    });

    try {
      const response = await axios.post("<YOUR_BACKEND_ENDPOINT>", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Handle response here
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const submitHandler = () => {
    console.log("submit");
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
          <>
            {item.type === "meal" ? (
              <View style={Commonstyles.flexGap}>
                <View style={[Commonstyles.flexGap, styles.button]}>
                  <FoodIcon />
                  <Text>{number}째끼</Text>
                </View>
              </View>
            ) : (
              <View style={Commonstyles.flexGap}>
                <View style={[Commonstyles.flexGap, styles.button]}>
                  <CoocieIcon />
                  <Text>간식</Text>
                </View>
              </View>
            )}
          </>
          <Pressable onPress={() => setIsButtonClicked(!isButtonClicked)}>
            <View style={[Commonstyles.flexGap, styles.button]}>
              <PlusIcon />
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
            onChangeText={setText}
            value={text}
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
