import LoginHeader from 'components/login/Login-header'
import { ThemeProvider } from 'theme-ui';
import { StickyProvider } from 'contexts/app/app.provider';
import theme from 'theme';
import SEO from 'components/seo';
import Layoutlo from 'components/layoutlo';
import router, { useRouter } from 'next/router'
import Noentry from './Noentry';
import { Box, Container} from "theme-ui";
import {Label,Input,Button} from "theme-ui";
import { useState, useEffect, useRef } from "react";

import emailjs from "@emailjs/browser";


import { v4 as uuidv4 } from "uuid";
import {
  storage,
  firestore,
  serverTimestamp,
  human,
  auth,
  
} from 'config/firebase'
import { route } from 'next/dist/next-server/server/router';

function Create() {
  
  const [title, setTitle] = useState("");
  const [secret, setSecret] = useState("");
  const [pass, setPass] = useState("");
  const [image, setImage] = useState(null);
  const form = useRef();


  const SubmitDetails = () => {
    if (!title || !image) {
      return alert("Please enter a file with a name");
    }
    submit.innerHTML = "Uploading...";
    submit.disabled = true;
    submit.style.cursor = "not-allowed";
    submit.style.backgroundColor = "#ccc";

    var uploadTask = storage.ref().child(`files/${uuidv4()}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progress == "100") return (
          submit.innerHTML = "Post",
          submit.disabled = false,
          submit.style.cursor = "pointer",
          submit.style.backgroundColor = "#4da64d",
          alert("File posted successfully 🎉") 
          );        
      },
      (error) => {
        alert("Error Uploading Image");
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          // setUrl(downloadURL)
          const yotch = downloadURL;

          firestore.collection("files").add({
            id: uuidv4(),
            user: auth.currentUser.uid,
            title: title,
            secret: secret,
            createdAt: serverTimestamp(),
            link: yotch,
          });

          setTitle("");
          setSecret("");


          
        });
        var templateParams = {
          name: "James",
          notes: "Check this out!",
        };
    
        emailjs
          .send("########", "#########", templateParams, "###########")
          .then(
            function (response) {
              console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
              console.log("FAILED...", error);
            }
          );
          
      }
      
    );
   
   
  };







  const manush = auth.currentUser;



  if(manush != null){
    return (
    
      <ThemeProvider theme={theme} >
      <StickyProvider>
        <Layoutlo>
          <SEO title="Rokka ロッカー" />
  
        <LoginHeader/>
  
        <Box as="section" id="banner" sx={styles.banner}>
        <Container sx={styles.container}>
          
        <center>
        <h2>Upload a File</h2>
        <br/>

        <div autoComplete="off" ref={form}  >

        <input type="text" placeholder="Enter a file name" required autoComplete='off'
          style={{
            width: "300px",
            height: "40px",
            borderRadius: "5px 5px 0 0 ",
            margin: "15px",
            border: "none",
            padding: "5px",
            borderBottom: "1px solid black",
            background: "transparent",
          }} 
          value={title}
          id="title"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          />
        <br/>
        <input type="text" placeholder="Enter Secret code if you want"  autoComplete='off'
          style={{
            width: "300px",
            height: "40px",
            borderRadius: "5px 5px 0 0 ",
            margin: "15px",
            border: "none",
            padding: "5px",
            borderBottom: "1px solid black",
            background: "transparent",
          }} 
          value={secret}

          onChange={(e) => setSecret(e.target.value)}
          />
        <br/>
        <input type="file"    
        style={{
                width: "300px",
                height: "40px",
                borderRadius: "5px 5px 0 0 ",
                margin: "15px",
                border: "none",
                padding: "5px",
                borderBottom: "1px solid black",
              }}  
              onChange={(e) => setImage(e.target.files[0])}
              />
        <br/>
       
        <br/>
        <button
          className="btn green"
          style={{

            padding: "15px",
            background: "#FF4D4D",
            borderRadius: "5px",
            border: "none",
            fontSize: "16px",
            color: "white",
            width: "140px",
            marginRight:'5px'
          }}
          onClick={() => router.push("/Dashboard")}
        >
          {" "}
          Back
        </button>

        <button 
          style={{

            padding: "15px",
            background: "#4da64d",
            borderRadius: "5px",
            border: "none",
            fontSize:'16px',
            color: "white",
            cursor: "pointer",
            width: "140px",
            marginLeft:'5px'
          }}
          id="submit"
          onClick={() => SubmitDetails()}
          >Upload</button>


        </div>
        </center>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>


       


       
        </Container>
        </Box>
  
  
  
        </Layoutlo>
        </StickyProvider>
      </ThemeProvider>
   
  
    )
  }
  else{
    return(
    <div>
      <Noentry/>
    </div>
  )}
  }
  
  
  const styles = {

    banner: {
      overflow: "hidden",
      backgroundColor: "#F9FBFD",
      width:'100%',
      // height:'100%',
      position:'absolute',
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

export default Create