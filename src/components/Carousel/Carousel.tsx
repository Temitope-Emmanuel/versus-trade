import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Image from "next/image"

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath:
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 750,
    flexGrow: 1,
    // height:"25rem",
    "& > div:nth-child(2)":{
      justifyContent:"center"
    }
  },
  img: {
    display: 'block',
    overflow: 'hidden',
    width: '100%',
    height:"25rem",
  },
}));


const carouselImage = ["ebay.png","googlePlay.png","vanila.png","walmart.png","btc.png","amazon.png","steam.png","amazonExpress.png","xrp.png"]

function SwipeableTextMobileStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = carouselImage.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div className={`flex flex-col md:flex-row items-center md:items-start justify-center m-5 max-w-6xl"`}>
      <div className={`${classes.root} max-w-xl mx-3`}>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={1}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {carouselImage.map((img, idx) => (
            <div key={idx} className="max-w-lg mx-auto" >
              {Math.abs(activeStep - idx) <= 2 ? (
                <Image width="400" height="400" layout="responsive" 
                 className={classes.img} src={`/carouselImage/${img}`} alt="" />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          variant="dots"
          activeStep={activeStep}
          nextButton={
            <Button style={{
              display:"none"
            }} size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowForward />}
            </Button>
          }
          backButton={
            <Button style={{
              display:"none"
            }} size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
              Back
            </Button>
          }
        />
      </div>
      <div className="m-3 mt-0 px-3 max-w-sm flex flex-col text-center md:text-left">
        <h2  className="text-2xl my-6 font-medium text-red-600">
          Transaction Made Easy
        </h2>
        <p className="my-3 italic text-base">
          It is a long established fact that a reader will be distracted by the readable content
          of a page when looking at its layout. The point of using Lorem Ipsum is that it has a
          more-or-less normal distribution of letters, as opposed to using 'Content here, content here', 
          making it look like readable English.
        </p>
        <Button variant="outlined" color="default" className="text-red-700 bg-red-100 hover:bg-red-200">
          Continue
        </Button>
      </div>
    </div>
  );
}

export default SwipeableTextMobileStepper;