const int ledPin = 2;
const int buttonPin = 4;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);  // internal pull-up resistor
}

void loop() {
  int buttonState = digitalRead(buttonPin);

  if (buttonState == LOW) {  // button pressed = LOW (connected to GND)
    digitalWrite(ledPin, HIGH);  // LED on
  } else {
    digitalWrite(ledPin, LOW);   // LED off
  }
}
