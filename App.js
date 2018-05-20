import Expo from "expo";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Card, CardSection, Button, Header } from "./src/components/common";
import SignaturePad from "./src/components/SignaturePad";
import { uploadImage } from "./src/components/utils/files";
export default class App extends React.Component {
  state = {
    image: "",
    uri: "",
    url:
      "https://previews.123rf.com/images/fordzolo/fordzolo1609/fordzolo160900068/62072161-bah-black-speech-bubbles-white-wording-on-striped-sun-yellow-black-background.jpg",
  };

  async getSignature() {
    const result = await Expo.takeSnapshotAsync(this.pageView, {
      result: "file",
      format: "jpg",
    });

    const id = "0695136a-6586-4b5f-b05e-324f12786fc6";

    await uploadImage("recipient", "signature", id, result)
      .then((response: object) => {
        console.log("RESPONSE", response);
        if (response.url) {
          this.setState({ uri: response.url });
        }
      })
      .catch((error: ?object) => {
        console.log("ERROR", error);
      });

    // console.log(result);

    // let data = {
    //   file: this.state.image,
    // };
    // Expo.FileSystem
    //   .downloadAsync(
    //     JSON.stringify(data),
    //     Expo.FileSystem.documentDirectory + "signature.png"
    //   )
    //   .then((response: ?object) => {
    //     this.setState({ uri: response.uri });
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  }
  render() {
    _signaturePadError = error => {
      console.error(error);
    };

    _signaturePadChange = ({ base64DataUrl }) => {
      console.log("Got new signature: " + base64DataUrl);
      this.setState({ image: base64DataUrl });
    };

    return (
      <View style={styles.container}>
        <Header text={"Signature Pad"} />
        <Card>
          <CardSection>
            <View
              ref={(view: ?object) => {
                this.pageView = view;
              }}
              style={{ height: 300, width: "100%" }}
            >
              <SignaturePad
                onError={this._signaturePadError}
                onChange={this._signaturePadChange}
                style={{
                  flex: 1,
                  backgroundColor: "gray",
                  height: 280,
                }}
              />
            </View>
          </CardSection>

          <CardSection>
            <Button text={"Capt"} onPress={this.getSignature.bind(this)} />
          </CardSection>

          <CardSection>
            <View style={{ padding: 5, height: 280, width: "100%" }}>
              <Image
                style={{
                  borderColor: "#000",
                  borderWidth: 2,
                  flex: 1,
                  width: "100%",
                  height: null,
                }}
                resizeMode={"stretch"}
                source={{
                  uri: this.state.uri
                    ? this.state.uri
                    : "https://i3.cpcache.com/product/576152888/sheep_bah.jpg",
                }}
              />
            </View>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
