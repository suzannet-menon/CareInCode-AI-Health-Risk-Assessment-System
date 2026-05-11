from PyPDF2 import PdfReader

from app.ocr.pdf_ocr_engine import (
    extract_text_from_scanned_pdf
)


def extract_text_from_pdf(
    pdf_path: str
):

    text = ""

    reader = PdfReader(pdf_path)

    for page in reader.pages:

        extracted = page.extract_text()

        if extracted:

            text += extracted + "\n"

    # SMART FALLBACK
    if len(text.strip()) < 50:

        return extract_text_from_scanned_pdf(
            pdf_path
        )

    return {

        "text": text,

        "confidence": 0.95,

        "method": "pypdf2"
    }