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
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useRecoilValue } from "recoil";
import { fontStyle } from "../assets/font/font";
import SpashIcon from "../assets/icon/main.svg";
import { baseURLData } from "../data/userData";
import { DefaultButton } from "../util/defaultButton";

function RegisterScreen({ navigation }) {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
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
    if (!ageCheck || !useCheck || !marketingCheck) {
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
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-start",
          }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <SpashIcon />
              <Text style={fontStyle.BD36}>회원가입</Text>
              <Text style={[fontStyle.BD24, { marginBottom: 50 }]}>
                나만의 습관을 시작해보세요!
              </Text>

              <KeyboardAvoidingView
                style={{ width: "100%" }}
                behavior={Platform.OS === "ios" ? "position" : "height"}
                keyboardVerticalOffset={60}
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
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    Keyboard.dismiss(); // 키보드 내리기
                    nameInputRef.current && nameInputRef.current.focus();
                  }}
                  blurOnSubmit={false}
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
                  <Text style={styles.checkboxLabel}>
                    만 14세 이상입니다. (필수)
                  </Text>
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
                  <TouchableOpacity
                    onPress={() => handleShowAgreement("terms")}
                  >
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
                  <Text style={styles.checkboxLabel}>
                    개인정보 수집 및 이용동의 (필수)
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleShowAgreement("marketing")}
                  >
                    <Text style={styles.linkText}>내용보기</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
              {loading ? (
                <ActivityIndicator size="large" color="#307ecc" />
              ) : (
                <View>
                  <DefaultButton
                    pressHandler={handleRegister}
                    text="회원가입"
                  />
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
                      {currentAgreement === "terms" && "이용약관 동의"}
                      {currentAgreement === "marketing" &&
                        "개인정보 수집 및 이용동의"}
                    </Text>
                    <Text style={styles.modalContent}>
                      {currentAgreement === "age" &&
                        "만 14세 이상이어야 서비스를 이용할 수 있습니다. 만약 14세 미만이면 부모님의 동의를 받아야 하며, 이용이 제한될 수 있습니다."}
                      {currentAgreement === "terms" && (
                        <>
                          <Text style={styles.termsTitle}>
                            가. 서비스 이용 목적
                          </Text>
                          <Text>
                            : 이 앱은 사용자의 건강 관리 및 습관 형성을 돕기
                            위한 서비스로, 이를 위한 개인 정보와 활동 기록을
                            분석하여 맞춤형 서비스를 제공합니다.
                          </Text>
                          {"\n\n"}

                          <Text style={styles.termsTitle}>나. 사용자 책임</Text>
                          <Text>
                            : 사용자는 서비스 이용 시 본인의 정보를 정확히
                            입력해야 하며, 부정확한 정보로 인해 발생한 문제에
                            대해 책임을 질 수 있습니다.
                          </Text>
                          {"\n\n"}

                          <Text style={styles.termsTitle}>
                            다. 서비스 이용 제한
                          </Text>
                          <Text>
                            : 사용자가 불법적인 활동을 하거나 약관을 위반할
                            경우, 서비스 이용이 제한되거나 계정이 삭제될 수
                            있습니다.
                          </Text>
                          {"\n\n"}

                          <Text style={styles.termsTitle}>라. 서비스 중단</Text>
                          <Text>
                            : 서비스 제공자는 시스템 유지 보수나 기타 사유로
                            인해 서비스 제공을 일시적으로 중단할 수 있으며, 이에
                            대한 사전 공지를 할 수 있습니다.
                          </Text>
                          {"\n\n"}

                          <Text style={styles.termsTitle}>마. 면책 사항</Text>
                          <Text>
                            : 서비스 제공자는 사용자가 본 서비스를 통해 얻은
                            정보 및 자료에 대해 법적 책임을 지지 않으며,
                            사용자는 본인의 판단에 따라 서비스를 이용해야
                            합니다.
                          </Text>
                        </>
                      )}
                      {currentAgreement === "marketing" && (
                        <>
                          <Text style={styles.termsTitle}>
                            가. 수집 및 이용 목적
                          </Text>
                          <Text>
                            : 회원가입, 사용자 맞춤형 서비스 제공, 이용정보
                            분석, 신제품 개발 및 연구
                          </Text>
                          {"\n\n"}

                          <Text style={styles.termsTitle}>
                            나. 개인정보 수집 항목
                          </Text>
                          <Text>
                            : 이름, ID, 비밀번호, 어플리케이션 이용 정보(감정 및
                            습관 기록, 이용시간 등)
                          </Text>
                          <Text style={{ fontWeight: "bold", color: "red" }}>
                            * 심리 상태를 기록하는 어플리케이션 특성상 건강 등에
                            관한 정보와 같은 민감정보가 포함될 수 있습니다.
                          </Text>
                          {"\n\n"}
                          <Text style={styles.termsTitle}>
                            다. 보유 및 이용기간
                          </Text>
                          <Text>: 회원 탈퇴시</Text>
                          {"\n\n"}
                          <Text style={styles.termsTitle}>
                            라. 개인정보 수집에 대한 권리
                          </Text>
                          <Text>
                            : 귀하는 개인정보 수집에 동의를 거부할 권리가
                            있으며, 거부 시 서비스 이용이 제한됩니다.
                          </Text>
                        </>
                      )}
                    </Text>
                  </ScrollView>
                  <DefaultButton pressHandler={handleAgree} text="동의하기" />
                </View>
              </BottomSheetModal>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
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
    paddingBottom: 30,
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
    lineHeight: 24,
  },
  registerText: {
    marginTop: 15,
    fontSize: 16,
    color: "#2D81FF",
    textDecorationLine: "underline",
  },

  termsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
});

export default RegisterScreen;
