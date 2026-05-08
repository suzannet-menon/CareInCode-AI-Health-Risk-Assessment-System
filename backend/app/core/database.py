from pymongo import MongoClient

import app.core.config as config


client = MongoClient(
    config.settings.MONGO_URI
)


def get_database():

    return client[
        config.settings.DATABASE_NAME
    ]


db = get_database()