from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.common.exceptions import NoSuchElementException
import time

# You can optionally set path to your chromedriver executable
# service = Service("/path/to/chromedriver")
driver = webdriver.Chrome()  # or use: webdriver.Chrome(service=service)

URL = "https://the-internet.herokuapp.com/login"

def login(username, password):
    driver.get(URL)
    driver.find_element(By.ID, "username").send_keys(username)
    driver.find_element(By.ID, "password").send_keys(password)
    driver.find_element(By.CSS_SELECTOR, "button.radius").click()

def assert_success():
    try:
        message = driver.find_element(By.CSS_SELECTOR, ".flash.success").text
        assert "You logged into a secure area!" in message
        print("✅ Valid Login Test Passed")
    except (AssertionError, NoSuchElementException):
        print("❌ Valid Login Test Failed")

def assert_error():
    try:
        message = driver.find_element(By.CSS_SELECTOR, ".flash.error").text
        print(f"[DEBUG] Error Message: {message}")  # Print actual message for debugging
        assert "Your username is invalid" in message or "Your password is invalid" in message
        print("✅ Invalid Login Test Passed")
    except (AssertionError, NoSuchElementException):
        print("❌ Invalid Login Test Failed")

# Run valid login test
login("tomsmith", "SuperSecretPassword!")
time.sleep(1)
assert_success()

# Run invalid login test
login("invalidUser", "invalidPass")
time.sleep(1)
assert_error()

driver.quit()