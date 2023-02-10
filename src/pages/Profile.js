import React from "react";
import LoginHeader from "components/login/Login-header";
import { ThemeProvider } from "theme-ui";
import { StickyProvider } from "contexts/app/app.provider";
import theme from "theme";
import SEO from "components/seo";
import Layoutlo from "components/layoutlo";
import { firebase } from "../config/firebase";
import { useRouter } from "next/router";
import Noentry from "./Noentry";
import { Box, Container } from "theme-ui";
import { Label, Input, Button } from "theme-ui";
import { useState } from "react";
import { useEffect } from "react";
import photourl from "../assets/user.svg";


function Profile() {
  // import who logged in
  const [userPhoto, setUserPhoto] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [userProvider, setUserProvider] = useState(null);
  const [userEmailVerified, setUserEmailVerified] = useState(null);
  const [userCreationTime, setUserCreationTime] = useState(null);
  const [userLastSignInTime, setUserLastSignInTime] = useState(null);

  // fetch only the files that matches with the user id  with useeffect

  const [files, setFiles] = useState([]);

  const firestore = firebase.firestore();
  useEffect(() => {
    firestore
      .collection("files")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const files = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFiles(files);
      });
  }, []);

  const router = useRouter();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUserPhoto(user.photoURL);
        setUserName(user.displayName);
        setUserEmail(user.email);
        setUserUid(user.uid);
        setUserProvider(user.providerData[0].providerId);
        setUserEmailVerified(user.emailVerified);
        setUserCreationTime(user.metadata.creationTime);
        setUserLastSignInTime(user.metadata.lastSignInTime);
      }
      console.log(user);
    });
  }, []);




  const auth = firebase.auth();

  if (firebase.auth().currentUser != null) {
    return (
      <ThemeProvider theme={theme}>
        <StickyProvider>
          <SEO title="Rokka ロッカー" />

          <Box as="section" id="banner" sx={styles.banner}>
            <Container sx={styles.container}>
              {/* display the useEffect data here */}
              <center>
                <div>
                  <img
                    src={photourl}
                    alt="userPhoto"
                    style={{ width: "20%", borderRadius: "50%" }}
                  />
                </div>

                <Label htmlFor="userEmail">Email</Label>
                <Input
                  styles={{ border: "none", background: "transparent" }}
                  id="userEmail"
                  name="userEmail"
                  disabled
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <Label htmlFor="userUid">User ID</Label>
                <Input
                  styles={{ border: "none", background: "transparent" }}
                  id="userUid"
                  name="userUid"
                  value={userUid}
                  onChange={(e) => setUserUid(e.target.value)}
                />

                <Label htmlFor="userCreationTime">Creation Time</Label>
                <Input
                  styles={{ border: "none", background: "transparent" }}
                  id="userCreationTime"
                  disabled
                  name="userCreationTime"
                  value={userCreationTime}
                  onChange={(e) => setUserCreationTime(e.target.value)}
                />
                <Label htmlFor="userLastSignInTime">Last Sign In Time</Label>
                <Input
                  styles={{ border: "none", background: "transparent" }}
                  id="userLastSignInTime"
                  disabled
                  name="userLastSignInTime"
                  value={userLastSignInTime}
                  onChange={(e) => setUserLastSignInTime(e.target.value)}
                />
                <br />
                <br />
                <Button
                  type="button"
                  sx={{
                    width: "48%",
                    height: "50px",
                    backgroundColor: "#FF4D4D",
                    marginRight: "5px",
                  }}
                  onClick={() => {
                    firebase.auth().signOut();
                    router.push("/Login");
                  }}
                >
                  Sign Out
                </Button>
                <Button
                  type="button"
                  sx={{
                    width: "48%",
                    height: "50px",
                    backgroundColor: "#0F2137",
                    marginLeft: "5px",
                  }}
                  onClick={() => {
                    router.push("/Dashboard");
                  }}
                >
                  Back to Dashboard
                </Button>
                <br />
                <br />
                <br />
              </center>

              {files.length === null ? (
                <h1 style={{ fontSize: "35px" }}>No files to Show</h1>
              ) : (
                <>
                  <h1 style={{ fontSize: "35px" }}>Your Files</h1>

                  <div>
                    {/* map the files that matches with the user id here */}
                    {files.map((file) => {
                      if (file.user === auth.currentUser.uid) {
                        return (
                          <div
                            key={file.id}
                            style={{
                              padding: "18px",
                              borderRadius: "8px",
                              border: "2px solid #ccc",
                              margin: "auto",
                              marginBottom: "20px",
                              marginTop: "20px",
                              backgroundColor: "transparent",
                              boxShadow: "0 0 5px 0 rgba(0,0,0,0.2)",
                            }}
                          >
                            <h1 style={{ fontSize: "20px" }}>{file.title}</h1>

                            <p style={{ fontSize: "15px" }}>
                              File Secret msg:{" "}
                              <kbd
                                style={{
                                  background: "#f2f2f2",
                                  padding: "3px",
                                  borderRadius: "6px",
                                }}
                              >
                                {file.secret}
                              </kbd>
                            </p>

                            <p
                            
                            

                              style={{ fontSize: "15px" }}
                            >
                              File Url:{" "}
                            
                               
                              

                          
                              <kbd
                                style={{
                                  background: "#f2f2f2",
                                  padding: "3px",
                                  borderRadius: "6px",
                                }}
                              >
                                {" "}
                                {file.link.substring(0, 30)}...{" "}
                              </kbd>

                            </p>
                           


                          </div>
                        );
                      }
                    })}
                  </div>
                </>
              )}
            </Container>
          </Box>
        </StickyProvider>
      </ThemeProvider>
    );
  } else {
    return (
      <div>
        <Noentry />
      </div>
    );
  }
}

const styles = {
  banner: {
    overflow: "hidden",
    backgroundColor: "#F9FBFD",
    width: "100%",
    // height:'100%',
    position: "absolute",
    textAlign: "center",
    pt: ["110px", null, null, null, "130px"],
    h2: {
      fontSize: ["28px", null, null, "32px", "38px", "48px", "64px"],
      lineHeight: 1.25,
      color: "#02073E",
      fontWeight: 700,
      width: "100%",
      maxWidth: ["100%", null, null, "55%", "500px", "640px", "851px"],
      mx: "auto",
      mt: "30px",
      mb: ["40px", null, null, "65px"],
    },
  },
  logo: {
    display: "block",
    width: "7%",
    borderRadius: "50%",
    mx: "auto",
    boxShadow: "0px 15px 35px rgba(65, 104, 139, 0.12)",
  },
  bannerImage: {
    display: "block",
    mx: "auto",
    position: "relative",
    maxWidth: ["100%", null, null, "80%", null, "100%"],
  },
  container: {
    position: "relative",
    ".bannerIcon": {
      position: "absolute",
      display: ["none", null, null, null, "block"],
    },
  },
};

export default Profile;
