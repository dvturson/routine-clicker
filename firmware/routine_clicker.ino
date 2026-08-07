#include "secrets.h"
#include <WiFi.h>
#include <FirebaseESP32.h>

#define DATABASE_URL "https://routine-clicker-default-rtdb.firebaseio.com"

#define BUTTON_PIN 4

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

void setup() {
  Serial.begin(115200);
  pinMode(BUTTON_PIN, INPUT_PULLUP);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi");

  config.database_url = DATABASE_URL;
  config.signer.test_mode = true;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  if (digitalRead(BUTTON_PIN) == LOW) {
    Firebase.setBool(fbdo, "/checkin/status", true);
    Serial.println("Sent: true");
    delay(300);
  }
}