#include "secrets.h"
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <time.h>

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

  // sync time from internet so we know today's date
  configTime(0, 0, "pool.ntp.org");
  Serial.print("Syncing time");
  while (time(nullptr) < 1000000000) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nTime synced");

  config.database_url = DATABASE_URL;
  config.signer.tokens.legacy_token = DB_SECRET;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

String getToday() {
  time_t now = time(nullptr);
  struct tm* t = gmtime(&now);
  char buf[11];
  strftime(buf, sizeof(buf), "%Y-%m-%d", t);
  return String(buf);
}

void loop() {

  if (Firebase.ready() && digitalRead(BUTTON_PIN) == LOW) {
    String path = "/checkin/days/" + getToday() + "/gym";
    if (Firebase.RTDB.setBool(&fbdo, path, true)) {
      Serial.println("Checked in: " + path);
    } else {
      Serial.println("Failed: " + fbdo.errorReason());
    }
    delay(300);
  }
}