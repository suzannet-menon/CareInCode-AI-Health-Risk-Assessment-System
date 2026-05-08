from pdf2image import convert_from_path

import os

from app.ocr.easyocr_engine import (
    extract_text_from_image
)


TEMP_DIR = "temp_pdf_pages"

os.makedirs(
    TEMP_DIR,
    exist_ok=True
)


def extract_text_from_scanned_pdf(
    pdf_path: str
):

    pages = convert_from_path(pdf_path)

    full_text = []

    confidence_scores = []

    for index, page in enumerate(pages):

        image_path = os.path.join(
            TEMP_DIR,
            f"page_{index}.jpg"
        )

        page.save(image_path, "JPEG")

        result = extract_text_from_image(
            image_path
        )

        full_text.append(
            result["text"]
        )

        confidence_scores.append(
            result["confidence"]
        )

    final_text = "\n".join(full_text)

    avg_confidence = (
        sum(confidence_scores)
        / len(confidence_scores)
        if confidence_scores else 0
    )

    return {

        "text": final_text,

        "confidence":
        round(avg_confidence, 2),

        "method":
        "easyocr_scanned_pdf"
    }