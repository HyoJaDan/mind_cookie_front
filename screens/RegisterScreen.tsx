import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Checkbox from "expo-checkbox";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRecoilValue } from "recoil";
import { fontStyle } from "../assets/font/font";
import SpashIcon from "../assets/icon/main.svg";
import { baseURLData } from "../data/userData";
import { DefaultButton } from "../uitll/defaultButton";

function RegisterScreen({ navigation }) {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [allCheck, setAllCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);
  const [currentAgreement, setCurrentAgreement] = useState(""); // 현재 보여줄 약관 내용 상태
  const passwordInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const baseURL = useRecoilValue(baseURLData);
  const URL = baseURL.split("/api")[0];

  // 약관 내용보기 관련 BottomSheetModal 설정
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["90%"], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  // 전체 동의 버튼 이벤트
  const allBtnEvent = () => {
    const newValue = !allCheck;
    setAllCheck(newValue);
    setAgeCheck(newValue);
    setUseCheck(newValue);
    setMarketingCheck(newValue);
  };

  // 회원가입 처리 함수
  const handleRegister = async () => {
    if (!ageCheck || !useCheck) {
      Alert.alert("필수 약관에 동의해주세요.");
      return;
    }

    if (!userId) {
      Alert.alert("아이디를 입력해주세요.");
      return;
    }
    if (!userPassword) {
      Alert.alert("비밀번호를 입력해주세요.");
      return;
    }
    if (!userName) {
      Alert.alert("이름을 입력해주세요.");
      return;
    }
    setLoading(true);

    let dataToSend = {
      username: userId,
      password: userPassword,
    };
    try {
      await fetch(`${URL}/join`, {
        method: "POST",
        body: JSON.stringify(dataToSend),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      setLoading(false);
      Alert.alert("회원가입 완료");
      navigation.replace("Auth");
    } catch (error) {
      setLoading(false);
      Alert.alert("회원가입 실패", "서버에 문제가 있습니다.");
    }
  };
  const handleAgree = () => {
    if (currentAgreement === "age") {
      setAgeCheck(true);
    } else if (currentAgreement === "terms") {
      setUseCheck(true);
    } else if (currentAgreement === "marketing") {
      setMarketingCheck(true);
    }
    bottomSheetModalRef.current?.close();
  };

  const handleShowAgreement = (type) => {
    setCurrentAgreement(type);
    handlePresentModalPress();
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <SpashIcon />
        <Text style={fontStyle.BD36}>회원가입</Text>
        <Text style={[fontStyle.BD24, { marginBottom: 50 }]}>
          나만의 습관을 시작해보세요!
        </Text>

        <KeyboardAvoidingView
          style={{ width: "100%" }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={100}
        >
          <TextInput
            style={styles.input}
            placeholder={"아이디"}
            onChangeText={(userId) => setUserId(userId)}
            autoCapitalize="none"
            autoFocus={true}
            returnKeyType="next"
            onSubmitEditing={() =>
              passwordInputRef.current && passwordInputRef.current.focus()
            }
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.input}
            placeholder={"비밀번호"}
            onChangeText={(userPassword) => setUserPassword(userPassword)}
            autoCapitalize="none"
            secureTextEntry={true}
            ref={passwordInputRef}
            returnKeyType="next"
            onSubmitEditing={() =>
              nameInputRef.current && nameInputRef.current.focus()
            }
            blurOnSubmit={false}
          />
          <TextInput
            style={styles.input}
            placeholder={"이름"}
            onChangeText={(userName) => setUserName(userName)}
            autoCapitalize="none"
            ref={nameInputRef}
            returnKeyType="done"
            onSubmitEditing={handleRegister}
          />
        </KeyboardAvoidingView>

        <View style={styles.agreementContainer}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={allBtnEvent}
          >
            <Checkbox
              value={allCheck}
              onValueChange={allBtnEvent}
              color={allCheck ? "#2D81FF" : undefined}
            />
            <Text style={styles.checkboxLabel}>전체 동의</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setAgeCheck(!ageCheck)}
          >
            <Checkbox
              value={ageCheck}
              onValueChange={setAgeCheck}
              color={ageCheck ? "#2D81FF" : undefined}
            />
            <Text style={styles.checkboxLabel}>만 14세 이상입니다. (필수)</Text>
            <TouchableOpacity onPress={() => handleShowAgreement("age")}>
              <Text style={styles.linkText}>내용보기</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setUseCheck(!useCheck)}
          >
            <Checkbox
              value={useCheck}
              onValueChange={setUseCheck}
              color={useCheck ? "#2D81FF" : undefined}
            />
            <Text style={styles.checkboxLabel}>이용약관 (필수)</Text>
            <TouchableOpacity onPress={() => handleShowAgreement("terms")}>
              <Text style={styles.linkText}>내용보기</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setMarketingCheck(!marketingCheck)}
          >
            <Checkbox
              value={marketingCheck}
              onValueChange={setMarketingCheck}
              color={marketingCheck ? "#2D81FF" : undefined}
            />
            <Text style={styles.checkboxLabel}>마케팅 동의 (선택)</Text>
            <TouchableOpacity onPress={() => handleShowAgreement("marketing")}>
              <Text style={styles.linkText}>내용보기</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#307ecc" />
        ) : (
          <View>
            <DefaultButton pressHandler={handleRegister} text="회원가입" />
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.registerText}>
                이미 계정이 있으신가요? 로그인하기
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
        >
          <View style={styles.modalContainer}>
            <ScrollView style={styles.modalContentContainer}>
              <Text style={[fontStyle.BD24, { alignSelf: "flex-start" }]}>
                {currentAgreement === "age" && "만 14세 이상 동의"}
                {currentAgreement === "terms" && "이용약관"}
                {currentAgreement === "marketing" && "마케팅 동의"}
              </Text>
              <Text style={styles.modalContent}>
                {currentAgreement === "age" &&
                  "만 14세 이상이어야 서비스를 이용할 수 있습니다. 만약 14세 미만이면 부모님의 동의를 받아야 하며, 이용이 제한될 수 있습니다. (내용 임시 추가)"}
                {currentAgreement === "terms" &&
                  "이용약관 내용이 여기에 들어갑니다. 이용자의 권리와 의무, 서비스 제공의 조건 등에 대한 약관입니다. (내용 임시 추가)"}
                {currentAgreement === "marketing" &&
                  "마케팅 정보 수신에 동의하시면 다양한 혜택을 받아보실 수 있습니다. 동의는 선택 사항입니다. (내용 임시 추가)"}
              </Text>
            </ScrollView>
            {/* 동의하기 버튼 */}
            <DefaultButton pressHandler={handleAgree} text="동의하기" />
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "white",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  agreementContainer: {
    width: "100%",
    marginVertical: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  linkText: {
    fontSize: 14,
    color: "#2D81FF",
    textDecorationLine: "underline",
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: "space-between",
  },
  modalContentContainer: {
    maxHeight: "80%",
  },
  modalContent: {
    fontSize: 16,
    marginVertical: 20,
  },
  registerText: {
    marginTop: 15,
    fontSize: 16,
    color: "#2D81FF",
    textDecorationLine: "underline",
  },
});

export default RegisterScreen;
