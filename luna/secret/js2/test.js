f((sosudSystemRotation * 57.3) >10   && (sosudSystemRotation * 57.3) < 60 ){
    if((sosudSystemRotation * 57.3) >10) {
      width = width *0.98;
    } /*else if ((sosudSystemRotation * 57.3) >15){
      width = width *0.96;
    } else if ((sosudSystemRotation * 57.3) >20){
      width = width *0.95;
    } else if ((sosudSystemRotation * 57.3) >25){
      width = width *0.94;
    } else if ((sosudSystemRotation * 57.3) >35){
      width = width *0.92;
    } else if ((sosudSystemRotation * 57.3) >45){
      width = width *0.90;
    } else if ((sosudSystemRotation * 57.3) >55){
      width = width *0.94;
    } else if ((sosudSystemRotation * 57.3) >60){
      width = width;
    }*/

  geometriP.attributes.position.setY(0,  /*3 * proportion*/ width );
  geometriP.attributes.position.setY(1,  width );
  geometriP.attributes.position.setY(2,  width );
  geometriP.attributes.position.setY(3,  width );
  geometriP.attributes.position.setY(4,  width );
  geometriP.attributes.position.setY(5,  width );
  } else {
    geometriP.attributes.position.setY(0,  /*3 * proportion*/ width );
    geometriP.attributes.position.setY(1,  width );
    geometriP.attributes.position.setY(2,  width );
    geometriP.attributes.position.setY(3,  width );
    geometriP.attributes.position.setY(4,  width );
    geometriP.attributes.position.setY(5,  width );
  }
  geometriP.attributes.position.needsUpdate = true;

  if((sosudSystemRotation * 57.3) >10   && (sosudSystemRotation * 57.3) < 60 ){
    if((sosudSystemRotation * 57.3) >10) {
      positionX = positionX *0.99;
    } /*else if ((sosudSystemRotation * 57.3) >15){
      positionX = positionX *0.98;
    } else if ((sosudSystemRotation * 57.3) >20){
      positionX = positionX *0.975;
    } else if ((sosudSystemRotation * 57.3) >25){
      positionX = positionX *0.97;
    } else if ((sosudSystemRotation * 57.3) >35){
      positionX = positionX *0.96;
    } else if ((sosudSystemRotation * 57.3) >45){
      positionX = positionX *0.95;
    } else if ((sosudSystemRotation * 57.3) >55){
      positionX = positionX *0.97;
    } else if ((sosudSystemRotation * 57.3) >60){
      positionX = positionX;
    }*/
     plane.position.set(-1.5 -  /*(3 * proportion - 3)/2*/positionX/*-10*/,  0 , 0 );
  } else {
    plane.position.set(-1.5 -  /*(3 * proportion - 3)/2*/positionX/*-10*/,  0 , 0 );
  }