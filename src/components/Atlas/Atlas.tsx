import React from "react"
import {Box} from "@material-ui/core"
import {makeStyles,createStyles,Theme} from "@material-ui/core/styles"
import Image from "next/image"


const useStyles = makeStyles((theme:Theme) =>
    createStyles({
        root:{
            position:"relative",
            backgroundImage:`url(world/atlas.png)`,
            height:"50vh",
            backgroundPosition:"center",
            backgroundSize:"contain",
            backgroundRepeat:"no-repeat",
            "& img":{
              filter:"grayscale(60%)",
              position:"absolute",
              transition:"all .1s linear",
              [theme.breakpoints.down("sm")]:{
                height:"4em !important"
              },
              "&:hover":{
                filter:"grayscale(0)",
                transform:"scale(1.1) !important"
              }
            },
            "& div:first-child":{
              left:"30%",
              top:"15%",
              height:"5em",
              width:"5em", 
             },
             "& div:nth-child(2)":{
               left:"43%",
               top:"45%",
               height:"7em",
                width:"7em"
             },
             "& div:nth-child(3)":{
               right:"10%",
               top:"65%",
               height:"6.5em",
                width:"6.5em"
             },
             "& div:nth-child(4)":{
               left:"30%",
               top:"20%",
               height:"3em",
                width:"3em",
             },
             "& div:nth-child(5)":{
               right:"40%",
               top:"10%",
                height:"7em",
                width:"7em"
             }
          }
    })
)

const personImageArr = ["Image15.png","Image16.png","Image17.png","Image18.png","Image19.png"]


const Atlas = () => {
    const classes = useStyles()

    return(
        <Box className={classes.root}>
             <Image width="50" height="50" layout="intrinsic" data-aos="fade" data-aos-delay={700}
                 src={`/world/${personImageArr[0]}`}/>
            <Image width="50" height="50" layout="intrinsic"  data-aos="fade" data-aos-delay={700} 
               src={`/world/${personImageArr[1]}`}/>
            <Image width="50" height="50" layout="intrinsic"  data-aos="fade" data-aos-delay={900}
                src={`/world/${personImageArr[2]}`}/>
            <Image width="100" height="100" layout="intrinsic"  data-aos="fade" data-aos-delay={1000} 
               src={`/world/${personImageArr[3]}`}/>
            <Image width="50" height="50" layout="intrinsic"  data-aos="fade" data-aos-delay={1100} 
               src={`/world/${personImageArr[4]}`}/>
        </Box>
    )
}


export default Atlas