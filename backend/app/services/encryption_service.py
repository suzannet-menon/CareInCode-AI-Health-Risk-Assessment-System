from cryptography.fernet import Fernet


# GENERATED VALID FERNET KEY
FERNET_KEY = b'6A9d5K9vVn8QmH2wZrX7YcP1LsT4uEiJfGhBnMqRtYs='

cipher = Fernet(
    FERNET_KEY
)


def encrypt_data(
    text: str
):

    encrypted = cipher.encrypt(
        text.encode()
    )

    return encrypted.decode()


def decrypt_data(
    encrypted_text: str
):

    decrypted = cipher.decrypt(
        encrypted_text.encode()
    )

    return decrypted.decode()