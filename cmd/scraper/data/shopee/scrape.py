import os
import json
import argparse

import requests
import openai
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


load_dotenv()

URL_BASE = "https://shopee.sg/"
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
RAW_DATA_FOLDER_NAME = "rawData"
DESC_DATA_FOLDER_NAME = "descData"
REFINEDDATA_FOLDER_NAME = "refinedData"
RAW_DATA_FOLDER = os.path.join(SCRIPT_DIR, RAW_DATA_FOLDER_NAME)
DESC_DATA_FOLDER = os.path.join(SCRIPT_DIR, DESC_DATA_FOLDER_NAME)
REFINED_DATA_FOLDER = os.path.join(SCRIPT_DIR, REFINEDDATA_FOLDER_NAME)
openai.api_key = os.getenv("OPENAI_API_KEY")


def create_folder_structure(folder, search_param, page_number):
    folder_path = os.path.join(SCRIPT_DIR, folder, search_param, str(page_number))
    os.makedirs(folder_path, exist_ok=True)
    return folder_path


# ---------------------------------------------------------------------------- #
#                                   FILL DESC                                  #
# ---------------------------------------------------------------------------- #
def login(driver):
    driver.get(URL_BASE + "buyer/login")
    input("Press enter to continue after logging in...")


def extract_description(path, driver, wait):
    listing_url = URL_BASE + path
    driver.get(listing_url)

    description_elements = wait.until(
        EC.presence_of_all_elements_located((By.CLASS_NAME, "irIKAp"))
    )
    description_paragraph = "\n".join(
        [element.text for element in description_elements]
    )

    return description_paragraph


def fill_description(raw_data_path, refined_data_path, driver, wait):
    with open(raw_data_path, "r", encoding="utf-8") as f:
        raw_data = json.load(f)

    refined_data = {
        "query": raw_data["query"],
        "region": raw_data["region"],
        "total": raw_data["total"],
        "results": [],
    }

    for result in raw_data["results"]:
        description = extract_description(result["path"], driver, wait)
        result["description"] = description.rstrip()
        refined_data["results"].append(result)

    os.makedirs(os.path.dirname(refined_data_path), exist_ok=True)

    with open(refined_data_path, "w", encoding="utf-8") as f:
        json.dump(refined_data, f, ensure_ascii=False, indent=4)


# ---------------------------------------------------------------------------- #


# ---------------------------------------------------------------------------- #
#                                    REFINE                                    #
# ---------------------------------------------------------------------------- #
def generate_better_text(original_title, original_description):
    prompt = f"Title: {original_title}\n\nDescription: {original_description}\n\nGenerate improved title and description to be used as a product listing on shopping websites.\n\nPlease write your answer in this form: Title: <title>\n\nDescription: <description>"
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=200,
        temperature=0.5,
    )

    texts = response.choices[0].text.strip().split("\n")
    improved_texts = list(filter(None, texts))
    refined_title = improved_texts[0].removeprefix("Title: ")
    refined_description = improved_texts[1].removeprefix("Description: ")
    return refined_title, refined_description


def refine_data(desc_data_path, refined_data_path):
    with open(desc_data_path, "r", encoding="utf-8") as f:
        raw_data = json.load(f)

    refined_data = {
        "query": raw_data["query"],
        "region": raw_data["region"],
        "total": raw_data["total"],
        "results": [],
    }

    for result in raw_data["results"]:
        refined_title, refined_description = generate_better_text(
            result["title"], result.get("description", "")
        )
        result["title"] = refined_title
        result["description"] = refined_description
        result["path"] = f"{URL_BASE}{result['path']}"
        refined_data["results"].append(result)

    os.makedirs(os.path.dirname(refined_data_path), exist_ok=True)

    with open(refined_data_path, "w", encoding="utf-8") as f:
        json.dump(refined_data, f, ensure_ascii=False, indent=4)


# ---------------------------------------------------------------------------- #


def main():
    parser = argparse.ArgumentParser(description="Shopee Scraper")
    parser.add_argument(
        "action", choices=["populate", "filldesc", "refine"], help="Action to perform"
    )
    args = parser.parse_args()

    if args.action == "populate":
        url = os.getenv("SHOPEE_RAPID_API_URL")
        categories = [
            "Electronics and Gadgets",
            "Home and Kitchen",
            "Fashion and Accessories",
            "Books and Stationery",
            "Beauty and Personal Care",
            "Toys and Games",
            "Sports and Outdoor Gear",
            "Art and Craft Supplies",
            "Food and Gourmet Gifts",
            "Travel and Adventure",
        ]

        headers = {
            "X-RapidAPI-Key": os.getenv("SHOPEE_RAPID_API_KEY"),
            "X-RapidAPI-Host": os.getenv("SHOPEE_RAPID_API_HOST"),
        }

        for category in categories:
            for page_number in range(1, 4):
                querystring = {"q": category, "p": page_number}
                response = requests.get(url, headers=headers, params=querystring)

                if response.status_code == 200:
                    folder_path = create_folder_structure(
                        RAW_DATA_FOLDER, category, page_number
                    )
                    file_path = os.path.join(folder_path, "raw_data.json")

                    with open(file_path, "w") as f:
                        json.dump(response.text, f, ensure_ascii=False, indent=4)

                    print(f"Saved response for '{category}' page {page_number}")
                else:
                    print(
                        f"Error for '{category}' page {page_number}: {response.status_code}"
                    )

    elif args.action == "filldesc":
        options = webdriver.ChromeOptions()
        options.add_argument("start-maximized")
        options.add_argument("disable-infobars")
        options.add_argument("--disable-extensions")
        driver = webdriver.Chrome(options=options)
        wait = WebDriverWait(driver, 10)

        login(driver)

        for root, _, files in os.walk(RAW_DATA_FOLDER):
            for file in files:
                if file.endswith(".json"):
                    desc_data_path = os.path.join(root, file)
                    desc_data_path = os.path.join(
                        DESC_DATA_FOLDER,
                        os.path.relpath(root, RAW_DATA_FOLDER),
                        "desc.json",
                    )

                    fill_description(desc_data_path, desc_data_path, driver, wait)
                    print(f"Extracted description {desc_data_path} -> {desc_data_path}")

        driver.quit()

    elif args.action == "refine":
        for root, _, files in os.walk(DESC_DATA_FOLDER):
            for file in files:
                if file.endswith(".json"):
                    desc_data_path = os.path.join(root, file)
                    refined_data_path = os.path.join(
                        REFINED_DATA_FOLDER,
                        os.path.relpath(root, DESC_DATA_FOLDER),
                        "refined.json",
                    )

                    refine_data(desc_data_path, refined_data_path)
                    print(
                        f"Generated better descriptions in {desc_data_path} -> {refined_data_path}"
                    )

    else:
        print("Invalid action")


if __name__ == "__main__":
    main()
