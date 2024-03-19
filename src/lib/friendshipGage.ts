export const friendshipGage = (friendship:number) =>{
  if(friendship<10){
    return "bird0_white.vrm"
  }
  if(friendship<20){
    return "bird1_whitepink.vrm" 
  }
  if(friendship<30){
    return "bird9_pink.vrm"
  }
  if(friendship<40){
    return "bird2_brown.vrm"
  }
  if(friendship<50){
    return "bird4_orange.vrm"
  }
  if(friendship<60){
    return "bird6_blue.vrm"
  }
  if(friendship<70){
    return "bird7_green.vrm"
  }
  if(friendship<80){
    return "bird8_purple.vrm"
  }
  if(friendship<90){
    return "bird5_rainbow.vrm"
  }
  if(friendship<=100){
    return "Girl.vrm"
  }
  return "bird0_white.vrm"
}