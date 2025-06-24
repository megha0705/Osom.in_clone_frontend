from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()
URL = "https://the-internet.herokuapp.com/javascript_alerts"
driver.get(URL)

# ---------- JS Alert ----------
def handle_js_alert():
    driver.find_element(By.XPATH, "//button[text()='Click for JS Alert']").click()
    alert = driver.switch_to.alert
    print(f"[JS Alert Text] {alert.text}")
    alert.accept()
    result = driver.find_element(By.ID, "result").text
    assert "You successfully clicked an alert" in result
    print("✅ JS Alert handled successfully")

# ---------- JS Confirm ----------
def handle_js_confirm():
    driver.find_element(By.XPATH, "//button[text()='Click for JS Confirm']").click()
    alert = driver.switch_to.alert
    print(f"[JS Confirm Text] {alert.text}")
    alert.dismiss()  # or alert.accept()
    result = driver.find_element(By.ID, "result").text
    assert "You clicked: Cancel" in result
    print("✅ JS Confirm dismissed successfully")

# ---------- JS Prompt ----------
def handle_js_prompt():
    driver.find_element(By.XPATH, "//button[text()='Click for JS Prompt']").click()
    alert = driver.switch_to.alert
    print(f"[JS Prompt Text] {alert.text}")
    alert.send_keys("Selenium Test")
    alert.accept()
    result = driver.find_element(By.ID, "result").text
    assert "You entered: Selenium Test" in result
    print("✅ JS Prompt handled with input")

# Run all 3 handlers
handle_js_alert()
time.sleep(1)
handle_js_confirm()
time.sleep(1)
handle_js_prompt()

driver.quit()