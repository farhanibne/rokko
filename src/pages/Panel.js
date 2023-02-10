import React, { useState, useEffect } from "react";
import { firestore } from "../config/firebase";
import { Box, Container, Image, Heading } from "theme-ui";
import { jsx, Flex } from "theme-ui";
import loading from "./loading.gif";
import { saveAs } from "file-saver";

function Panel({ arti }) {
  const [file, setFile] = useState([]);
  const [search, setSearch] = useState("");




  useEffect(() => {
    firestore
      .collection("files")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setFile(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  if (file.length > 0) {
    if (file === null) {
      return (
        <Box as="section" id="banner" sx={styles.banner}>
          <Container sx={styles.container}>
            <h1 style={{ fontSize: "35px" }}>Loading</h1>
          </Container>
        </Box>
      );
    } else {
      return (

        <>
          <Box as="section" id="banner" sx={styles.banner}>
            <Container sx={styles.container}>
              <input
                type="search"
                placeholder="Search"
                style={{
                  height: "24px",
                  marginLeft: "20px",
                  marginRight: "20px",
                  padding: "16px",
                  borderRadius: "8px 8px 0 0 ",
                  width: "90.333333%",
                  outline: "none",
                  border: "none",
                  borderBottom: "3px solid #d9d9d9 ",
                }}
                onChange={(e) => setSearch(e.target.value)}
              />
              {file
                .filter((arti) => {
                  if (search === "") {
                    return arti;
                  } else if (
                    arti.title.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return arti;
                  } else if (
                    arti.secret
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    return arti;
                  }
                  else if(
                    arti.pass.toLowerCase().includes(search.toLowerCase())
                  )
                  {
                    return arti;
                  }
                })
                .map((arti, pos) => (
                  <div key={pos}>
                  <center>
                    <div >
                      <div className="card">
                        <div
                          className="font-semibold "
                          style={{ height: "auto", width: "98%" }}
                        >
                            {/* file links goes there */}
                        </div>
                        <div>
                          <p className="title">{arti.title}</p>
                          {arti.createdAt === null ? (
                            " "
                          ) : (
                            <p>
                              {" "}
                              Uploaded ⏱️{" "}
                              {arti.createdAt.toDate().toDateString()}
                            </p>
                          )}
                          <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                          <p style={{color:'#999999',marginRight:'2px'}}>Secret: </p>
                          {arti.secret === null ? (
                            " "
                          ) : (
                            <p style={{color:'blue',marginLeft:'3px'}}>{arti.secret}</p>
                          )}
                         
                          </div>

                          <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                          <p style={{color:'#999999',marginRight:'2px',marginLeft:'2px'}}>Attached File </p>
                          
                          <button





                        style={{
                          color: 'white',
                          backgroundColor: '#0F2137',
                          padding: '7px 13px',
                          borderRadius: '5px',
                          textDecoration: 'none',
                          marginLeft:'3px',cursor:'pointer',
                          border:'none'


                        }}
                        
                        onClick={() => {
                          // save the file into pc 
                          saveAs(arti.link);

                        }
                        }

                         >
                        
                        Download File
                          </button> 
                            

                          </div>
                         
                            </div>
                      </div>
                    </div>
                  </center>
                  </div>
                ))}
            </Container>
          </Box>

          <style jsx>
            {`
              .card {
                max-width: 500px;
                margin: 22px auto;
                border-radius: 5px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
                padding: 20px;
              }
              img {
                width: 100%;
                height: auto;
              }
              .title {
                font-size: 35px;
                font-weight: bold;
                margin: 10px 0;
                display: -webkit-box;
                overflow: hidden;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }
              .summary {
                -webkit-user-select: none;
                -ms-user-select: none;
                user-select: none;
              }
            `}
          </style>
        </>
      );
    }
  } else if (file.length === null) {
    return (
      <Box as="section" id="banner" sx={styles.banner}>
        <Container sx={styles.container}>
          <h1 style={{ fontSize: "35px" }}>Loading</h1>
        </Container>
      </Box>
    );
  } else {
    return (
      <Box as="section" id="banner" sx={styles.banner}>
        <Container sx={styles.container}>
          <div style={{ height: "100vh", background: "#F8FBFD" }}>
            <center>
              <img
                src={loading}
                alt="loading"
                style={{ height: "auto", width: "50%" }}
              />
            </center>
          </div>
        </Container>
      </Box>
    );
  }
}

const styles = {
  banner: {
    overflow: "hidden",
    backgroundColor: "#F9FBFD",
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
  main: {
    padding: "25px",
    borderRadius: "5px",
    height: "auto",
    width: "80vw",
    border: "3px solid #d9d9d9",
    "@media screen and (max-width: 960px)": {
      border: "3px solid #d9d9d9",
    },
  },
};

export default Panel;
