user_health_memory = {}


def save_health_record(
    user_id: str,
    metrics: dict
):

    if user_id not in user_health_memory:

        user_health_memory[user_id] = []

    user_health_memory[user_id].append(
        metrics
    )


def get_user_history(
    user_id: str
):

    return user_health_memory.get(
        user_id,
        []
    )