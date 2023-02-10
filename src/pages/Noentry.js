import React from 'react'
import { ThemeProvider } from "theme-ui";
import theme from "theme";
import icon from 'assets/rokka.svg'
import Image from 'components/image';



function Noentry() {
  return (
   <>
   
      <ThemeProvider theme={theme}>

      <div style={{ height: "45px", background: "white" }}>

    

        

        </div>

        <div>

            <center>
                <Image src={icon} height={400} width={400} />

                <h1>Entry Restricted</h1>
                <p >Contact the owner if you have access,or Login again if you are the member, it's for you security</p>
                <br/>

                <div style={{}}>
                    <a href='./' style={{textDecoration:'none',padding:'15px',borderRadius:'7px',color:'white',background:'#0F2137'}}>
                    Back to Home
                    </a>
             
                </div>
               
            </center>
        

        </div>

      </ThemeProvider>
   
   </>
  )
}

export default Noentry