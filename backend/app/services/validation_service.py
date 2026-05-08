ALLOWED_EXTENSIONS = [
    ".pdf",
    ".png",
    ".jpg",
    ".jpeg"
]

MAX_FILE_SIZE_MB = 10


def validate_file(filename: str) -> bool:

    filename = filename.lower()

    return any(
        filename.endswith(ext)
        for ext in ALLOWED_EXTENSIONS
    )